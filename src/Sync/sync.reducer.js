import { actions } from 'app/Sync';

const INITIAL_STATE = {
    isRefreshing: false,
    actionsDirty: false,
    syncSuccess: false,
    syncError: false,
    actions: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch(type) {
        case actions.REMOVE_ACTION:
        return {
            ...state,
            actionsDirty: true,
            actions: payload.actions || [],
        }
        case actions.SYNC_ACTIONS:
        console.log('payload', payload)
        return {
            ...state,
            actionsDirty: true,
            ...payload,
        }
        default:
        return {
            ...state
        }
    }
}
