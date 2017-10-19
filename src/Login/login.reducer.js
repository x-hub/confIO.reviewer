import { actions } from './LoginWithQRCode';

export default (state = {}, action) => {
    switch(action.type) {
        case actions.QR_CODE_READ:
            return state;
        default:
            return state;
    }
}
