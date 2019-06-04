import {ACTIONS} from 'app/App/actionsType';
import nativeStorage from "app/App/Services/nativeStorage"
import {actions} from "app/Login/LoginWithSavedSession/index"
import navActions from 'app/Navigator/navigator.actions';
export default (state = {
    event:null,
    talk:{},
    speakers: [],
    selectedSpeaker: {},
    isReady: false,
    showSpeakerDetail: false,
    type:""
}, {type,payload,routeName,params}) => {
    switch (type) {
        case navActions.Navigate :
            if(routeName === "Detail"){
               return {
                   ...state,
                   ...payload,
                   ...params,
                   isReady: true,
               }
            }
            return {
                ...state
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
                isReady: payload
            }
        default:
            return state;
    }
}
