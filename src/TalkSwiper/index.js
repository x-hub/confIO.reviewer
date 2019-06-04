import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {ACTIONS} from "app/App/actionsType"
import { creators as navActionCreators } from 'app/Navigator/navigator.actions';
import template from "./talkswiper.template"
import _ from "lodash"
import nativeStorage from "app/App/Services/nativeStorage"
import { switchMap } from 'rxjs/operators';
import {of,forkJoin} from "rxjs";


export const actionCreators = {
    rateLater,
    showDetail,
    init,
};

function init(obj) {
    return {
        type: 'Swiper_INIT',
        payload: obj,
    }
}

function updateStorage(event, talk) {
    return forkJoin([
        nativeStorage.get(`${event.code}-talks`),
        nativeStorage.get(`${event.code}-talks-later`)
    ]).pipe(switchMap(([talks, later]) => {
        talks =_.filter(talks,(item)=> item != talk.id)
        later = _(later).concat(talk.id).sortedUniq().value()
        return forkJoin([
            nativeStorage.save(`${event.code}-talks`, talks),
            nativeStorage.save(`${event.code}-talks-later`, later)
        ]).pipe(switchMap(() => of(
            {
                    type: ACTIONS.TALK_RATE_LATER,
                    payload: {
                        event,
                        talk,
                        talks,
                        later: later
                    }
            }
            )
        ))
    })).toPromise()
}

function showDetail(event,talk,type) {
    const {speakers} = talk
    const keys = speakers.map((uuid)=>`${event.code}-speaker-${uuid}`)
    const payload = nativeStorage.getArray(keys).pipe(switchMap((e)=>{
        return of({
            event,
            talk,
            speakers:(e && e[0] == null ? [] : e),
            type
        })
    })).toPromise()
    return navActionCreators.navigateToTalkDetails(payload)
}

function rateLater(event, talk) {
    return updateStorage(event,talk)
}

function mapStateToProps(state) {
    return {...state.talkswiper}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template)
