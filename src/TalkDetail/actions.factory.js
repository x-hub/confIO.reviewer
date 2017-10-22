import {ACTIONS} from "app/App/actionsType"

export const actionCreators = {
    OnRate,
    getSpeakersDetail,
    getSpeaker,
    toggleSpeakerDetail
};
function OnRate(talk) {
    return {
        type: ACTIONS.TALK_RATE,
        payload: talk
    }
}
function getSpeakersDetail(speakersId){
    return {
        type: ACTIONS.GET_SPEAKERS_DETAILS,
        payload: speakersId
    }
}
function getSpeaker(position) {
    return {
        type:ACTIONS.SELECT_SPEAKER,
        payload:position
    }
}
function toggleSpeakerDetail(boolean) {
    return {
        type: ACTIONS.TOGGLE_SPEAKER_DETAIL,
        payload: boolean
    }
}
