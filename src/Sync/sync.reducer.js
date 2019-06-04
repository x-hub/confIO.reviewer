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
        return {
            ...state,
            actionsDirty: true,
            actions : payload.actions,
            syncError: payload.syncError,
            syncSuccess:payload.syncSuccess
        }
        case actions.REMOVE_RESPONSE_ANIMATION:
        return {
            ...state,
            syncSuccess: false,
            syncError: false,
        }
        case actions.RESET:
        return {
            ...state,
            ...payload,
        }
        default:
        return {
            ...state
        }
    }
}
