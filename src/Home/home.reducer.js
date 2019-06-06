import { ACTIONS } from 'app/App/actionsType';
import {actions} from "app/Login/LoginWithSavedSession/"
import navActions from 'app/Navigator/navigator.actions';
import {actions as SyncActions} from "../Sync"

const INITIAL_STATE = {
    event:{},
    isReady:false,
    talks:[],
    reviewed:[],
    later:[],
    user:{}
};

export default (state = INITIAL_STATE, { type, payload, routeName, params }) => {
    switch(type) {
        case navActions.Navigate :
            if(routeName === "Home"){
                return {
                    ...state,
                    ...params,
                    isReady:true
                }
            }
            return {...state}
        case actions.SELECT_EVENT:
            return {
                ...state,
                ...payload,
            };
        case ACTIONS.TALK_RATE_LATER:
            return{
                ...state,
                talks:payload.talks,
                later:payload.later
            }
        case ACTIONS.UPDATE_HOME :
            return {
                ...state,
                ...payload
            }
        case SyncActions.SYNC_ACTIONS : {
            return {
                ...state,
                ...payload.synchronizedTalks
            }
        }
        default:
            return {
                ...state
            };
    }
}
