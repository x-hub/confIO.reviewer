import React, { Component } from 'react';
import template from './loginWithSavedSession.template';


export default class LoginWithSavedSession extends Component {

    render() {
        return template(this.props);
    }
}
