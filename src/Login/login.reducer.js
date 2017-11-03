import { ACTIONS } from 'app/App/actionsType';
import { actions as loginActions } from 'app/Login';

export default (state = {event:null}, action) => {
    switch(action.type) {
        case loginActions.FETCH_DEFAULT_EVENT:
            return {
                ...state,
                event: action.payload,
            }
        default:
            return state;
    }
}
