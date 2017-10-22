import React, { Component } from 'react';
import template from './loginWithSavedSession.template';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export const actions = {
    EVENT_SELECTED: 'EVENT_SELECTED',
};

const actionCreators = {
   onEventSelected
};


function onEventSelected(e) {
    return {
        type: actions.EVENT_SELECTED,
        payload: e
    }
}


function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template);
