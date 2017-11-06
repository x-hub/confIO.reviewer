import { actions } from 'app/Login/LoginWithQRCode';
import navActions from 'app/Navigator/navigator.actions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case navActions.GOTO_LoginWithQRCode:
            return {
                ...state,
               reactivateQRScanner: true
            };
        case actions.QR_CODE_READ:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
