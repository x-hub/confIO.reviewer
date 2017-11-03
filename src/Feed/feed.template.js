import React, {Component} from "react"
import {Text, View,} from "react-native";
import {Container, Header, Content, Spinner} from 'native-base';

import _ from "lodash"
import {Observable} from "rxjs"
import nativeStorage from "app/App/Services/nativeStorage"
import Http from "app/App/Services/Http"

export default class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []}
    }

    componentWillMount() {
        let {event} = this.props;
        const {navigate} = this.props.navigation;
        let BaseUrl = event.baseUrl.concat("/", event.eventCode);
        let ScheduleUrl = BaseUrl.concat("/schedules/")
        let SpeakersUrl = BaseUrl.concat("/speakers/")
        Http.get(ScheduleUrl).map((e) => e.links).switchMap((Links) => {
            let AllTalksRequest = Links.map((link) => Http.get(link.href).map((e) => e.slots));
            return Observable.forkJoin(AllTalksRequest)
        }).switchMap((resp) => {
            let talks = _(resp).flatMap().filter((e)=>e.talk!=null).value();
            let keys = talks.map((talk) => `${event.eventCode}-talk-${talk.slotId}`)
            this.props.initTalks(event,talks);
            nativeStorage.save(keys, talks)
            nativeStorage.save(`${event.eventCode}-talks`, talks.map((t) => t.slotId))
            return Http.get(SpeakersUrl)
        }).switchMap((speakers) => {
            let AllSpeakersRequest = speakers.map((speaker) => Http.get(speaker.links[0].href))
            return Observable.forkJoin(AllSpeakersRequest)
        }).switchMap((fullSpeakersDetail) => {
            let keys = fullSpeakersDetail.map((speaker) => `${event.eventCode}-speaker-${speaker.uuid}`)
            this.props.initSpeakers(event,fullSpeakersDetail);
            return Observable.forkJoin([
                nativeStorage.save(keys, fullSpeakersDetail),
                nativeStorage.save(`${event.eventCode}-speakers`, fullSpeakersDetail.map((s) => s.uuid))
            ])
        }).subscribe((e) => {
            navigate('Home')
        })


    }

    render() {
        return (<Container style={{justifyContent: "center", alignItems: "center"}}>

            <Spinner color='red'/>
            <Text style={{color: "#000"}}>
            </Text>
        </Container>);
    }
}

