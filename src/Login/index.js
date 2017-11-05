import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import template from './login.template';
import nativeStorage from "app/App/Services/nativeStorage"
import {Observable} from "rxjs"
import {
    AsyncStorage,
} from 'react-native';

export const actions = {
    FETCH_DEFAULT_EVENT: 'FETCH_DEFAULT_EVENT',
};

const actionCreators = {
    fetchDefaultEvent,
};

class Login extends Component {
    componentWillMount() {
        this.props.fetchDefaultEvent();
    }

    render() {
        return template(this.props);
    }
}
export function fetchTalks(event) {
    let talks = nativeStorage.get(`${event.code}-talks`)
    let talksReviewed = nativeStorage.get(`${event.code}-talks-reviewed`)
    let talksLater = nativeStorage.get(`${event.code}-talks-later`)
    let user = nativeStorage.get(`${event.code}-user`)

    return Observable.forkJoin([talks,talksReviewed,talksLater,user])
        .switchMap(([talks,reviewed,later,user])=>Observable.of({event,talks,reviewed,later,user}))
        .toPromise()
}
function fetchDefaultEvent() {
    const defaultEvent = AsyncStorage.getItem('events')
    .then((events) => {
        const event = JSON.parse(events)[0];
        if(event) {
            return AsyncStorage.getItem(`event-${event}`);
        } else {
            return Promise.reject();
        }
    })
    .then((event) => JSON.parse(event))
    .catch((err) => null);
    return {
        type: actions.FETCH_DEFAULT_EVENT,
        payload: defaultEvent,
    };
}

function mapStateToProps(state) {
    return state.login;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

