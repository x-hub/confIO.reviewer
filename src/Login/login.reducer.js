import { ACTIONS } from 'app/App/actionsType';
import { actions as loginActions } from 'app/Login';

export default (state = {}, action) => {
    switch(action.type) {
        case ACTIONS.QR_CODE_READ:
            return {
                ...action.payload
            };
        case loginActions.FETCH_DEFAULT_EVENT:
            return {
                ...state,
                event: action.payload,
            }
        default:
            return state;
    }
}
