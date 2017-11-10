import React, {Component} from "react"
import {Text, View,} from "react-native";
import {Container, Header, Content, Spinner} from 'native-base';
import _ from "lodash"
import {Observable} from "rxjs"
import nativeStorage from "app/App/Services/nativeStorage"
import {colors} from "shared/theme"
import Http from "app/App/Services/Http"
import {AutoPlayAnimation} from "shared"

export default class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []}
    }

    componentWillMount() {
        const {authToken, authEndpoint, eventDetailsEndpoint} = this.props.navigation.state.params;
        let eventDetail = Http.getBody(eventDetailsEndpoint);
        let events = nativeStorage.get('events');
        let auth = Http.post(authEndpoint, {
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({token: authToken}),
            credentials: 'include'
        });

        Observable.forkJoin([eventDetail, events, auth])
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
            }).switchMap((event) => {
            let BaseUrl = event.baseUrl.concat("api/conferences/", event.code);
            let ScheduleUrl = BaseUrl.concat("/schedules/")
            let SpeakersUrl = BaseUrl.concat("/speakers/")
            return Http.getBody(ScheduleUrl).map((e) => e.links).switchMap((Links) => {
                let AllTalksRequest = Links.map((link) => Http.getBody(link.href).map((e) => e.slots));
                return Observable.forkJoin(AllTalksRequest)
            }).switchMap((resp) => {
                let talks = _(resp).flatMap().filter((e) => e.talk != null).map((e)=>e.talk).value();
                let keys = talks.map((talk) => talk.id)
             //   this.props.initTalks(event, talks);
                nativeStorage.save(`${event.code}-talks`,keys)
                nativeStorage.save(`${event.code}-talks-reviewed`,[])
                nativeStorage.save(`${event.code}-talks-later`,[])
                nativeStorage.save(`${event.code}-activity`,[])
                keys = keys.map((key)=>`${event.code}-talk-${key}`)
                nativeStorage.save(keys,talks)
                return Http.getBody(SpeakersUrl)
            }).switchMap((speakers) => {
                let AllSpeakersRequest = speakers.map((speaker) => Http.getBody(speaker.links[0].href))
                return Observable.forkJoin(AllSpeakersRequest)
            }).switchMap((fullSpeakersDetail) => {
                let keys = fullSpeakersDetail.map((speaker) => `${event.code}-speaker-${speaker.uuid}`)
                nativeStorage.save(keys,fullSpeakersDetail);
                let uuids = fullSpeakersDetail.map((speaker)=>speaker.uuid)
                nativeStorage.save(`${event.code}-speakers`,uuids)
                 //  this.props.initSpeakers(event,[] ,_.zipObject(uuids,fullSpeakersDetail));
                return Observable.forkJoin([
                    nativeStorage.save(keys, fullSpeakersDetail),
                    nativeStorage.save(`${event.code}-speakers`, fullSpeakersDetail.map((s) => s.uuid))
                ]).switchMap(()=>{
                    return Observable.of(event);
                })
            })

        }).subscribe((e) => {
            this.props.GOTOHome(e)
        }, (event) => {
            if(JSON.stringify(event) == JSON.stringify({})) return;
            this.props.GOTOHome(event)
        })


    }

    render() {
        return (<Container style={{backgroundColor:colors.primary,justifyContent: "center", alignItems: "center"}}>
            <Spinner style={{height:200,width:200}} color={colors.white} />
        </Container>);
    }
}

