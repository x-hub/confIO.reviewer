import {actions} from "./LoginWithQRCode"

export default (state = {event:null}, action) => {
    switch(action.type) {
        case actions.QR_CODE_READ:
            return {
                ...state,
                event:action.payload
            };
        default:
            return state;
    }
}
