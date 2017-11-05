import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {ACTIONS} from "app/App/actionsType"
import navActions from 'app/Navigator/navigator.actions';
import template from "./talkswiper.template"
import _ from "lodash"
import nativeStorage from "app/App/Services/nativeStorage"
import {Observable} from "rxjs"


export const actionCreators = {
    RateLater,
    showDetail
};

function updateStorage(event, talk) {
    return Observable.forkJoin([
        nativeStorage.get(`${event.code}-talks`),
        nativeStorage.get(`${event.code}-talks-later`)
    ]).switchMap(([Talks, Later]) => {
        let talks =_.filter(Talks,(item)=>{
            return item != talk.id;
        })
        let later = Later.slice()
        later.push(talk.id)
        later = _.sortedUniq(later);
        return Observable.forkJoin([
            nativeStorage.save(`${event.code}-talks`, talks),
            nativeStorage.save(`${event.code}-talks-later`, later)
        ]).switchMap(() => {
            return Observable.of(
                {type: ACTIONS.TALK_RATE_LATER,
                    payload: {
                        event,
                        talk,
                        talks,
                        later: Later
                    }
                }
               )
        })
    }).toPromise()
}
function showDetail(event,talk,type) {
    let {speakers} = talk
    let keys = speakers.map((speaker)=>`${event.code}-speaker-${speaker.link.uuid}`)
    return nativeStorage.getArray(keys).switchMap((e)=>{
        return Observable.of({
            type:navActions.GOTO_Detail,
            payload:{
                event,
                talk,
                speakers:e,
                type
            }
        })
    }).toPromise()
}
function RateLater(event, talk) {
    return updateStorage(event,talk)
}

function mapStateToProps(state) {

    return {...state.talkswiper}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template)