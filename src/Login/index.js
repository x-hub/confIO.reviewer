import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import template from './login.template';
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

function fetchDefaultEvent() {
    const defaultEvent = AsyncStorage.getItem('events')
    .then((events) => {
        const event = JSON.parse(events)[0];
        if(event) {
            return AsyncStorage.getItem(`events:${event}`);
        } else {
            return Promise.reject();
        }
    })
    .then((event) => JSON.parse(event));
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

