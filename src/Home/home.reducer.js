import { ACTIONS } from 'app/App/actionsType';
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
        case ACTIONS.TALK_RATE_LATER:
          return {
            ...state,
            talks:payload.talks,
            later:payload.later,
          }
        default:
            return state
    }
}
