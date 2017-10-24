import { actions } from 'app/Login/LoginWithSavedSession';

export default (state = {}, action) => {
    switch(action.type) {
        case actions.SELECT_EVENT:
            return {
                ...state,
                selectedEvent: action.payload,
            };
        case actions.SHOW_EVENT_DETAILS:
            return {
                ...state,
                selectedEvent: action.payload,
                dialogVisible: true,
            };
        case actions.HIDE_EVENT_DETAILS:
            return {
                ...state,
                selectedEvent: null,
                dialogVisible: false,
            };
        default:
            return state;
    }
}
