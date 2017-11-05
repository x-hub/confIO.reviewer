import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import template from "./talkdetail.template"
import {ACTIONS} from "app/App/actionsType"
import navActions from 'app/Navigator/navigator.actions';
import {talkStatus} from "app/Home/index"
import _ from "lodash"
import nativeStorage from "app/App/Services/nativeStorage"
import {Observable} from "rxjs"

function OnRate(event, talk, type, score) {
    let keyOthers = type == talkStatus.NotReviewed ?
        `${event.code}-talks` : `${event.code}-talks-${talkStatus.Later}`
    let keyReviewed = `${event.code}-talks-${talkStatus.Reviewed}`
    let reviewedtalks = nativeStorage.get(keyReviewed)
    let activity = {target: talk.id, timestamp: Date.now(), score}
    let others = nativeStorage.get(keyOthers)
    let observable = (type == talkStatus.Reviewed
        ? nativeStorage.get(`${event.code}-activity`).switchMap((activities) => {
            activities.push(activity)
            return nativeStorage.save(`${event.code}-activity`, activities).switchMap(() => {
                return Observable.of({})
            })
        }) : Observable.forkJoin([reviewedtalks, others])
            .switchMap(([reviewed, others]) => {
                return nativeStorage.get(`${event.code}-activity`)
                    .switchMap((activities) => {
                        activities.push(activity)
                        return nativeStorage.save(`${event.code}-activity`, activities)
                    }).switchMap(() => {
                        others = others.filter((e) => e != talk.id)
                        reviewed.push(talk.id)
                        return Observable.forkJoin([
                            nativeStorage.save(keyOthers, others),
                            nativeStorage.save(keyReviewed, reviewed)
                        ])
                    }).switchMap(() => {
                        return Observable.of({
                            others,
                            reviewed
                        })
                    })
            }))
    return observable.switchMap(({others, reviewed}) => {
        let action = {type: navActions.GOTO_Swiper, payload: {}}
        if (type != talkStatus.Reviewed) {
            action.payload.talk = talk
            action.payload.reviewed = reviewed
            if (type == talkStatus.NotReviewed) action.payload.talks = others
            else action.payload.later = others
        }
        return Observable.of(action)
    }).toPromise()

}


function getSpeaker(position) {
    return {
        type: ACTIONS.SELECT_SPEAKER,
        payload: position
    }
}

function toggleSpeakerDetail(boolean) {
    return {
        type: ACTIONS.TOGGLE_SPEAKER_DETAIL,
        payload: boolean
    }
}

function toggleContentLoader(boolean) {
    return {
        type: ACTIONS.SET_CONTENT_PLACEHOLDER_STATE,
        payload: boolean
    }
}

const actionCreators = {
    OnRate,
    getSpeaker,
    toggleSpeakerDetail,
    toggleContentLoader
};

function mapStateToProps(state) {
    return {...state.talkdetail};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template);