import { actions } from 'app/Login/LoginWithQRCode';
import navActions from 'app/Navigator/navigator.actions';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actions.INVALID_QRCODE_DATA : {
            return {
                ...state,
                error: true,
                badCredentials:false,
            }
        }
        case actions.BAD_CREDENTIALS : {
            return {
                ...state,badCredentials:true,error:false,
            }
        }
        case actions.REACTIVATE_SCANNER:
        case navActions.Navigate:
            return {
                ...state,
               reactivateQRScanner: true, error: false,badCredentials:false,
            }

        default:
            return {
                ...state
            }
    }
}
