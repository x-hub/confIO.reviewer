import { ACTIONS } from 'app/App/actionsType';
import navActions from 'app/Navigator/navigator.actions';
import {actions} from "app/Login/LoginWithSavedSession/"

const INITIAL_STATE = {
    event:{},
    isReady:false,
    talks:[],
    reviewed:[],
    later:[],
    user:{}
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch(type) {
        case actions.SELECT_EVENT:
        case navActions.GOTO_Home:
            return {
                ...state,
                ...payload,
            };
        case navActions.GOTO_Swiper:
            return{
                ...state,
                ...payload
            }
        case ACTIONS.TALK_RATE_LATER:
                return{
                    ...state,
                    talks:payload.talks,
                    later:payload.later
                }
        default:
            return state;
    }
}
