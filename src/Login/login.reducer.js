import { ACTIONS } from 'app/App/actionsType';
import { actions as loginActions } from 'app/Login';
import {actions as loginActionsWithSavedSessions} from "./LoginWithSavedSession"

export default (state = {event:null}, action) => {
    switch(action.type) {
        case loginActions.FETCH_DEFAULT_EVENT:
            return {
                ...state,
                event: action.payload,
            }
        case loginActionsWithSavedSessions.DELETE_EVENT : {
            return {
                event :null
            }
        }
        default:
            return {
                ...state
            };
    }
}
