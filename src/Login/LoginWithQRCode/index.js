import React, { Component } from 'react';
import template from './LoginWithQRCode.template';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {ACTIONS} from "app/App/actionsType"
const actionCreators = {
    onQRCodeRead
};
function onQRCodeRead(e) {
    return {
        type: ACTIONS.QR_CODE_READ,
        payload: e
    }
}

function mapStateToProps(state) {
    return state.login;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template);
