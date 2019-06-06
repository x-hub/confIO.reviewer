import React, {Component} from "react"
import {Container, Header, Content, Spinner} from 'native-base';
import _ from "lodash"
import {throwError, forkJoin, of} from "rxjs"
import {catchError, mergeMap, switchMap, tap} from 'rxjs/operators';
import * as EventService from "app/App/Services/EventService"
import nativeStorage from "app/App/Services/nativeStorage"
import NetInfo from "app/App/Services/NetworkInfo"
import {colors} from "shared/theme"
import * as Http from "app/App/Services/Http"
import {preFetchImg} from "./index"
import FeedLoading from "shared/components/loading"
import FeedError from "shared/components/error"

export default class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feeding: false
        };
    }
    networkStatusHandler(payload){
        let condition = payload.type != "none"
        this.props.changeStatus(condition)
        if(condition) {
            if(!this.state.feeding) {
                this.setState(
                    state => ({ ...state, feeding: true}),
                    () => this.feedData()

                )
            }
        }
    }

    getEvent = (eventDetailsEndpoint) => {
        return Http.getBody(eventDetailsEndpoint).toPromise()
    }
    getAllStoredEvents = () => nativeStorage.get('events').toPromise()

    getAndPersistEventData =  async ()=> {
        const {authToken, authEndpoint, eventDetailsEndpoint} = this.props.navigation.state.params;
        let event  = await this.getEvent(eventDetailsEndpoint)
        let eventCollection = await this.getAllStoredEvents() || [];
        if(eventCollection.includes(event.code)){
            return event;
        }
        await Http.getBody(event.baseUrl.concat('cfp/profile.json'))
            .pipe(mergeMap((user)=>nativeStorage.save(`${event.code}-user`,user))).toPromise()
        const { notReviewedTalksUUIDs, reviewedTalksUUIDs, talks } = await EventService.firstSync(event).toPromise()
        await EventService.persistTalks(event, talks, reviewedTalksUUIDs || [], notReviewedTalksUUIDs || [])
        let conferenceAPIBaseUrl  = event.baseUrl.concat("api/conferences/", event.code);
        let speakersCollection   = await Http.getBody(conferenceAPIBaseUrl.concat("/speakers/"))
            .pipe(mergeMap((speakers)=> forkJoin(...speakers.map((speaker) => Http.getBody(speaker.links[0].href))))).toPromise()
        await forkJoin(this.saveSpeakers(event,speakersCollection),this.cacheSpeakersImages(speakersCollection)).toPromise()

        await nativeStorage.save('events',_.concat(eventCollection,event.code))
        await nativeStorage.save(`event-${event.code}`,event);
        return event;
    }

    cacheSpeakersImages = (speakers) => {
        let imgs = speakers.map((speaker)=>preFetchImg(speaker.avatarURL))
        return forkJoin(imgs)
    }
    saveSpeakers = (event,speakers) => {
        let keys = speakers.map((speaker) => `${event.code}-speaker-${speaker.uuid}`)
        let uuids = speakers.map((speaker)=>speaker.uuid)
        return forkJoin([nativeStorage.save(keys,speakers),nativeStorage.save(`${event.code}-speakers`,uuids)])
    }

    async feedData(){
        try {
            let event = await this.getAndPersistEventData()
            this.props.toggleAnimation(true)
            this.props.goHome(event)
        }catch (e) {
            // TODO : handle error fetch
            console.warn("Something goes wrong !!")
        }
    }

    componentWillUnmount(){
        NetInfo.unsubscribeToChange();
        this.props.toggleAnimation(false)
        _.invoke(this.networkSubscription,'unsubscribe',null)
    }

    componentWillMount() {
        NetInfo.subscribeToChange(this.networkStatusHandler.bind(this))
        this.networkSubscription = NetInfo.status().pipe(
            switchMap((e)=>{
                if(e.type == "none")
                    return throwError(false);
                else  return of(true)
            })
        ).subscribe((e)=>{
            if(e){
                this.props.changeStatus(e)
                if(!this.state.feeding) {
                    this.setState(
                        state => ({ ...state, feeding: true}),
                        () => this.feedData()

                    )
                }
            }
        },(err)=>{
            this.props.changeStatus(err)
        })
    }

    render() {
        const ContentContainer = this.props.online ? FeedLoading : FeedError
        return (<Container style={{backgroundColor:colors.primary}}>
            <ContentContainer {...this.props} />
        </Container>);
    }
}
