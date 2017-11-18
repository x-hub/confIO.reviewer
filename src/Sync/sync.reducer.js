import { actions } from 'app/Sync';

const INITIAL_STATE = {
    isRefreshing: false,
    actions: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch(type) {
        default:
        return state; 
    }
}
