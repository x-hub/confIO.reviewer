import { ACTIONS } from 'app/App/actionsType';
import navActions from 'app/Navigator/navigator.actions';

const INITIAL_STATE = {
    event: {}
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch(type) {
        default:
            return state;
    }
}
