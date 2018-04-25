import React, {Component} from "react"
import {Container, Header, Content, Spinner} from 'native-base';
import _ from "lodash"
import {Observable} from "rxjs"
import nativeStorage from "app/App/Services/nativeStorage"
import NetInfo from "app/App/Services/NetworkInfo"
import {colors} from "shared/theme"
import Http from "app/App/Services/Http"
import {preFetchImg} from "./index"
import loading from "shared/components/loading"
import error from "shared/components/error"

export default class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feeding: false
        };
    }
    NetworkStatusHandler(payload){
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
    getEventDetail(eventDetailsEndpoint){
        return Http.getBody(eventDetailsEndpoint)
    }
    getAllStoredEvents(){
        return nativeStorage.get('events');
    }
    Authenticate(authEndpoint,authToken){
        return Http.post(authEndpoint, {
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({token: authToken}),
            credentials: 'include'
        });
    }
    AuthAndGetEventDetail(){
        const {authToken, authEndpoint, eventDetailsEndpoint} = this.props.navigation.state.params;
        let eventDetail = this.getEventDetail(eventDetailsEndpoint);
        let events = this.getAllStoredEvents()
        let auth = this.Authenticate(authEndpoint,authToken)
        return   Observable.forkJoin([eventDetail, events, auth])
            .switchMap(([event, eventsString]) => {
                const events = eventsString ? eventsString : [];
                if (!events.includes(event.code)) {
                    events.push(event.code);
                    return nativeStorage.save('events', events).switchMap((e) => {
                        nativeStorage.save(`event-${event.code}`, event);
                        return Http.getBody(event.baseUrl.concat("cfp/profile.json"))
                            .switchMap((user)=>{
                                nativeStorage.save(`${event.code}-user`,user)
                                return Observable.of(event)
                            })

                    });
                } else {
                    return Observable.throw(event)
                }
            })
    }
    initTalkAndActivity(event,keys,talks){
        nativeStorage.save(`${event.code}-talks`,keys)
        nativeStorage.save(`${event.code}-talks-reviewed`,[])
        nativeStorage.save(`${event.code}-talks-later`,[])
        nativeStorage.save(`${event.code}-activity`,[])
        let Keys = keys.map((key)=>`${event.code}-talk-${key}`)
        nativeStorage.save(Keys,talks)
    }
    cacheSpeakersImages(speakers){
        let imgs= speakers.map((speaker)=>preFetchImg(speaker.avatarURL))
        return Observable.forkJoin(imgs)
    }
    saveSpeakers(event,speakers){
        let keys = speakers.map((speaker) => `${event.code}-speaker-${speaker.uuid}`)
        let uuids = speakers.map((speaker)=>speaker.uuid)
        return Observable.forkJoin([nativeStorage.save(keys,speakers),nativeStorage.save(`${event.code}-speakers`,uuids)])
    }
    feedData(){
        this.AuthAndGetEventDetail().switchMap((event) => {
            let BaseUrl = event.baseUrl.concat("api/conferences/", event.code);
            let ScheduleUrl = BaseUrl.concat("/schedules/")
            let SpeakersUrl = BaseUrl.concat("/speakers/")
            return Http.getBody(ScheduleUrl).map((e) => e.links).switchMap((Links) => {
                let AllTalksRequest = Links.map((link) => Http.getBody(link.href).map((e) => e.slots));
                return Observable.forkJoin(AllTalksRequest)
            }).switchMap((resp) => {
                let talks = _(resp).flatMap().filter((e) => e.talk != null).map((e)=>e.talk).value();
                let keys = talks.map((talk) => talk.id)
                this.initTalkAndActivity(event,keys,talks)
                return Http.getBody(SpeakersUrl)
            }).switchMap((speakers) => {
                let AllSpeakersRequest = speakers.map((speaker) => Http.getBody(speaker.links[0].href))
                return Observable.forkJoin(AllSpeakersRequest)
            }).switchMap((fullSpeakersDetail) => {
                return  this.cacheSpeakersImages(fullSpeakersDetail).switchMap(()=>{
                    return this.saveSpeakers(event,fullSpeakersDetail).switchMap(()=>{
                        return Observable.of(event);
                    })
                },(e)=>{
                    return Observable.of(event)
                })

            })
        }).subscribe(({value}) => {
            this.goToHome(value)
        }, (event) => {
            if(JSON.stringify(event) == JSON.stringify({})) return;
            this.goToHome(event)
        })
    }
    goToHome(event){
        this.props.toggleAnimation(true)
        setTimeout(()=>{
            this.props.GOTOHome(event)
        },1500)
    }
    componentWillUnmount(){
        NetInfo.UnsubscribeToChange();
        this.props.toggleAnimation(false)
    }
    componentWillMount() {
        NetInfo.SubscribeToChange(this.NetworkStatusHandler.bind(this))
        NetInfo.Info().switchMap((e)=>{
            if(e.type == "none")
                return Observable.throw(false);
            else  return Observable.of(true)
        }).subscribe((e)=>{
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
        const ContentContainer = this.props.online ? loading : error
        return (<Container style={{backgroundColor:colors.primary}}>
            <ContentContainer {...this.props} />
        </Container>);
    }
}
