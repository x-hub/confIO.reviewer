import { ACTIONS } from 'app/App/actionsType';
import navActions from 'app/Navigator/navigator.actions';

const INITIAL_STATE = {
    event: {}
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch(type) {
        case navActions.GOTO_Feed:
            return {
                ...state,
                event: payload,
            };
        default:
            return state;
    }
}
