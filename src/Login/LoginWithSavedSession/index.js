import React, {Component} from 'react';
import {
    AsyncStorage,
} from 'react-native';
import template from './loginWithSavedSession.template';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators as eventDetailsDialog} from 'app/EventDetailsDialog';
import nativeStorage from "app/App/Services/nativeStorage"
import { fetchTalks } from 'app/App/Services/EventService';
import { creators as navActionCreators } from 'app/Navigator/navigator.actions';
import {forkJoin, of} from "rxjs"
import { switchMap } from 'rxjs/operators';


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
    goHome,
};

function goHome(event) {
    return navActionCreators.navigateToHome(
      fetchTalks(event).toPromise()
    )
}

function readEventsFromStorage() {
    return nativeStorage.get('events').pipe(switchMap((events) =>
        _.isNil(events)  ? of([]) : forkJoin((events).map(readEventDetails))
    ));
    function readEventDetails(eventCode) {
        return nativeStorage.get(`event-${eventCode}`).pipe(switchMap((event) => of(event)))
    }
}

function deleteEventFromStorage(eventToDelete) {
    return readEventsFromStorage()
        .pipe(switchMap((events) => {
            const updatedEventsList = events.filter(
                (event) => event.code != eventToDelete.code
            )
            const updatedEventsCodeList = updatedEventsList.map(
                (event) => event.code
            )
            return forkJoin([
                nativeStorage.remove(`event-${eventToDelete.code}`),
                nativeStorage.save('events', updatedEventsCodeList)
            ])
                .pipe(switchMap(() => of(updatedEventsList)));
        }));
}


function fetchEvents() {
    const events = readEventsFromStorage().toPromise();
    return {
        type: actions.FETCH_ALL_EVENTS,
        payload: events,
    }
}

function selectEvent(e) {

    return {
        type: actions.SELECT_EVENT,
        payload: fetchTalks(e).toPromise(),
    }
}

function deleteEvent(e) {
    const updatedEvents = deleteEventFromStorage(e).toPromise();
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
