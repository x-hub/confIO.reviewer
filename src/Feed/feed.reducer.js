import { ACTIONS } from 'app/App/actionsType';
import navActions from 'app/Navigator/navigator.actions';

const INITIAL_STATE = {
    event: {},
    loaded:false,
    online:true,
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch(type) {
        case ACTIONS.ANIMATION_TOGGLE :
            return {
                ...state,
                loaded:payload
            }
        case ACTIONS.CHANGE_STATUS :
            return {
                ...state,
                online:payload
            }
        default:
            return {
                ...state
            };

    }
}
