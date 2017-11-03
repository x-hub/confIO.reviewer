import {ACTIONS} from 'app/App/actionsType';

export default (state = {
    event:null,
    AllSpeakers:[],
    speakers: [],
    selectedSpeaker: {},
    IsReady: false,
    showSpeakerDetail: false
}, action) => {
    switch (action.type) {
        case ACTIONS.INIT_SPEAKERS:
            return {
                ...state,
                AllSpeakers:action.payload.speakers,
                event:action.payload.event,
            }
        case ACTIONS.GET_SPEAKERS_DETAILS:
            const speakersID = action.payload.map((e) => e.name.replace(/\s/g, '').toLowerCase())
            const speakersFullDetail = state.AllSpeakers.filter((e) => {
                return speakersID.find((item) => item == e.firstName.concat(e.lastName).toLowerCase())
            })
            return {
                ...state,
                speakers: speakersFullDetail,
                IsReady: true
            }
        case ACTIONS.SELECT_SPEAKER:
            return {
                ...state,
                selectedSpeaker: state.speakers[action.payload],
                showSpeakerDetail: true
            }
        case ACTIONS.TOGGLE_SPEAKER_DETAIL:
            return {
                ...state,
                showSpeakerDetail: action.payload
            }
        case ACTIONS.SET_CONTENT_PLACEHOLDER_STATE:
            return {
                ...state,
                IsReady: action.payload
            }
        default:
            return state;
    }
}
