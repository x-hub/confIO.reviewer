import React, { Component } from 'react';
import template from './loginWithSavedSession.template';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as eventDetailsDialog } from 'app/EventDetailsDialog';

export const actions = {
    SELECT_EVENT: 'SELECT_EVENT',
    SHOW_EVENT_DETAILS: 'SHOW_EVENT_DETAILS',
    HIDE_EVENT_DETAILS: 'HIDE_EVENT_DETAILS',
    DELETE_EVENT: 'DELETE_EVENT',
};

const actionCreators = {
    selectEvent,
    showEventDetails,
    hideEventDetails,
    deleteEvent,
};


function selectEvent(e) {
    return {
        type: actions.SELECT_EVENT,
        payload: e,
    }
}

function deleteEvent(e) {
    return {
        type: actions.DELETE_EVENT,
        payload: e,
    }
}

function showEventDetails(e) {
    return {
        type: actions.SHOW_EVENT_DETAILS,
        payload: e,
    }
}

function hideEventDetails(e) {
    return {
        type: actions.HIDE_EVENT_DETAILS,
    }
}

function mapStateToProps(state) {
    return state.loginWithSavedSession;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template);
