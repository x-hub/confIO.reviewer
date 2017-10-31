import React, { Component } from 'react';
import {
    AsyncStorage,
} from 'react-native';
import template from './loginWithSavedSession.template';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as eventDetailsDialog } from 'app/EventDetailsDialog';

export const actions = {
    FETCH_ALL_EVENTS: 'FETCH_ALL_EVENTS',
    SELECT_EVENT: 'SELECT_EVENT',
    SHOW_EVENT_DETAILS: 'SHOW_EVENT_DETAILS',
    HIDE_EVENT_DETAILS: 'HIDE_EVENT_DETAILS',
    DELETE_EVENT: 'DELETE_EVENT',
};

const actionCreators = {
    fetchEvents,
    selectEvent,
    showEventDetails,
    hideEventDetails,
    deleteEvent,
};

function readEventsFromStorage() {
    return events = AsyncStorage.getItem('events')
    .then((events) => {
        return Promise.all(
            JSON.parse(events)
            .map(readEventDetails)
        )
    });

    function readEventDetails(eventCode) {
        return AsyncStorage.getItem(`events:${eventCode}`)
        .then((event) => JSON.parse(event));
    }
}

function deleteEventFromStorage(eventToDelete) {
    readEventsFromStorage()
    .then((events) => {
        const updatedEventsList = events.filter(
            (event) => event.code != eventToDelete.code
        )
        const updatedEventsCodeList = updatedEventsList.map(
            (event) => event.code
        )
        return Promise.all([
            AsyncStorage.removeItem(`events:${eventToDelete.code}`),
            AsyncStorage.setItem('events', JSON.stringify(updatedEventsCodeList))
        ])
        .then(() => updatedEventsList);
    });
}


function fetchEvents() {
    const events = readEventsFromStorage();
    return {
        type: actions.FETCH_ALL_EVENTS,
        payload: events,
    }
}

function selectEvent(e) {
    return {
        type: actions.SELECT_EVENT,
        payload: e,
    }
}

function deleteEvent(e) {
    const updatedEvents = deleteEventFromStorage(e);
    return {
        type: actions.DELETE_EVENT,
        payload: updatedEvents,
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
