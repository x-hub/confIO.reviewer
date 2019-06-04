import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import template from "./talkdetail.template"
import {ACTIONS} from "app/App/actionsType"
import { creators as navActionCreators } from 'app/Navigator/navigator.actions';
import {TALK_STATUS} from "app/Home/index"
import _ from "lodash"
import nativeStorage from "app/App/Services/nativeStorage";
import {mergeMap} from "rxjs/operators"

async function onRate(event, talk, type, score,callback) {

    let otherKey  = type == TALK_STATUS.NOT_REVIEWED ? `${event.code}-talks` : `${event.code}-talks-${TALK_STATUS.LATER}`
    let reviewedKey = `${event.code}-talks-${TALK_STATUS.REVIEWED}`
    let activity = {target: talk.id, timestamp: Date.now(), score}
    let reviewedTalks = await nativeStorage.get(reviewedKey).toPromise()
    let otherTalks = await nativeStorage.get(otherKey).toPromise()
    await  nativeStorage.get(`${event.code}-activity`).pipe(mergeMap((activities) =>
         nativeStorage.save(`${event.code}-activity`,_(activities).concat(activity).compact().value())
    )).toPromise()
    let payload = {event}
    if (type != TALK_STATUS.REVIEWED) {
        otherTalks = otherTalks.filter((e) => e != talk.id)
        reviewedTalks = _.concat(reviewedTalks,talk.id)
        await nativeStorage.save(otherKey,otherTalks).toPromise()
        await nativeStorage.save(reviewedKey,reviewedTalks).toPromise()
        payload = {
            ...payload,
            talk:talk,
            reviewed:reviewedTalks,
            [type == TALK_STATUS.NOT_REVIEWED ? 'talks' : 'later'] : otherTalks

        }
    }
    callback && callback(payload)
    return navActionCreators.navigateBack(payload)

}

function getSpeaker(position) {
    return {
        type: ACTIONS.SELECT_SPEAKER,
        payload: position
    }
}
function updateHome(payload) {
    return {
        type: ACTIONS.UPDATE_HOME,
        payload
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
    onRate,
    getSpeaker,
    toggleSpeakerDetail,
    toggleContentLoader,
    updateHome
};

function mapStateToProps(state) {
    return {...state.talkdetail};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template);
