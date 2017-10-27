import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import template from './sync.template';

const actions = {
    REMOVE_ACTION: 'REMOVE_ACTION',
    SYNC_ACTIONS: 'SYNC_ACTIONS',
};

const actionCreators = {
    removeAction,
    syncActions,
};

function removeAction({ id }) {
    return {
        type: actions.REMOVE_ACTION,
        payload: id,
    };
}

function syncActions() {
    return {
        type: actions.SYNC_ACTIONS,
    };
}

function mapStateToProps(state) {
    return state.sync;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template);
