import { actions } from 'app/Login/LoginWithQRCode';
import navActions from 'app/Navigator/navigator.actions';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actions.REACTIVATE_SCANNER:
        case navActions.Navigate:
            return {
                ...state,
               reactivateQRScanner: true,
            }
        default:
            return state
    }
}
