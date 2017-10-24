import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import template from "./talkdetail.template"
import {ACTIONS} from "app/App/actionsType"

function OnRate(talk) {
    return {
        type: ACTIONS.TALK_RATE,
        payload: talk
    }
}

function getSpeakersDetail(speakersId) {
    return {
        type: ACTIONS.GET_SPEAKERS_DETAILS,
        payload: speakersId
    }
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
    getSpeakersDetail,
    getSpeaker,
    toggleSpeakerDetail,
    toggleContentLoader
};

function mapStateToProps(state) {
    return state.talkdetail;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template);