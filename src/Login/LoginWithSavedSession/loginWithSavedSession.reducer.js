import { actions } from 'app/Login/LoginWithSavedSession';

const INITIAL_STATE = {
    events: [],
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case actions.FETCH_ALL_EVENTS:
            return {
                ...state,
                events: action.payload,
            }
        case actions.SELECT_EVENT:
            return {
                ...state,
                selectedEvent: action.payload,
            }
        case actions.SHOW_EVENT_DETAILS:
            return {
                ...state,
                selectedEvent: action.payload,
                dialogVisible: true,
            }
        case actions.HIDE_EVENT_DETAILS:
            return {
                ...state,
                selectedEvent: null,
                dialogVisible: false,
            }
        case actions.DELETE_EVENT:
            return {
                ...state,
                events: action.payload 
            }
        default:
            return state;
    }
}
