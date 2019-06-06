import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import template from './login.template';
import {
    AsyncStorage,
} from 'react-native';
import {fetchTalks} from 'app/App/Services/EventService';
import { creators as navActionCreators } from 'app/Navigator/navigator.actions';
import nativeStorage from "app/App/Services/nativeStorage"
import {mergeMap} from "rxjs/operators";
import {of} from "rxjs";


export const actions = {
    FETCH_DEFAULT_EVENT: 'FETCH_DEFAULT_EVENT',
};

const actionCreators = {
    fetchDefaultEvent,
    navigateToQRScanner,
    navigateToHome,
};

class Login extends Component {
    componentWillMount() {
        this.props.fetchDefaultEvent();
    }

    render() {
        return template(this.props);
    }
}

function navigateToQRScanner() {
    return navActionCreators.navigateToQRScanner()
}

export function navigateToHome(event) {
    return navActionCreators.navigateToHome(
        fetchTalks(event).toPromise()
    )
}

async function fetchDefaultEvent() {
    let defaultEventCode = await nativeStorage.get('events').pipe(mergeMap((events)=>of(_.get(events,0)))).toPromise()
    let defaultEvent = await nativeStorage.get(`event-${defaultEventCode}`).toPromise()
    /*
    const defaultEvent = AsyncStorage.getItem('events')
    .then((events) => {
        console.log(events)
        const event = JSON.parse(events)[0];
        if(event) {
            return AsyncStorage.getItem(`event-${event}`);
        } else {
            return Promise.reject();
        }
    })
    .then((event) => JSON.parse(event))
    .catch((err) => null);
    */
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

