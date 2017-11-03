import { actions } from 'app/Login/LoginWithQRCode';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actions.QR_CODE_READ:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
