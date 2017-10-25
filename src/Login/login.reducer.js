import { ACTIONS } from 'app/App/actionsType';

export default (state = {}, action) => {
    switch(action.type) {
        case ACTIONS.QR_CODE_READ:
            return {
                ...action.payload
            };
        default:
            return state;
    }
}
