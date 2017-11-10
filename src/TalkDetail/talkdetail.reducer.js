import {ACTIONS} from 'app/App/actionsType';
import nativeStorage from "app/App/Services/nativeStorage"
import {actions} from "app/Login/LoginWithSavedSession/index"
import navActions from 'app/Navigator/navigator.actions';
export default (state = {
    event:null,
    talk:{},
    speakers: [],
    selectedSpeaker: {},
    IsReady: false,
    showSpeakerDetail: false,
    type:""
}, {type,payload}) => {
    switch (type) {
        case 'INIT_TalkDetail':
            return {
                ...state,
                ...payload,
                IsReady: true,
            }
        case actions.SELECT_EVENT :
            return{
                ...state,
                event:payload.event
            }
        case ACTIONS.SELECT_SPEAKER :
            return {
                ...state,
                selectedSpeaker: state.speakers[payload],
                showSpeakerDetail: true
            }
        case ACTIONS.TOGGLE_SPEAKER_DETAIL:
            return {
                ...state,
                showSpeakerDetail: payload
            }
        case ACTIONS.SET_CONTENT_PLACEHOLDER_STATE:
            return {
                ...state,
                IsReady: payload
            }
        default:
            return state;
    }
}
