import React, { Component } from 'react';
import template from './login.template';

export default class Login extends Component {
    constructor() {
        super();
    }
    render() {
        return template(this.props);
    }
}
