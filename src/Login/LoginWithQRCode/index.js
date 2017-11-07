import React, { Component } from 'react';
import template from './loginWithQRCode.template';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AsyncStorage } from 'react-native';
import navActions from 'app/Navigator/navigator.actions';
import nativeStorage from "app/App/Services/nativeStorage"
import Http from "app/App/Services/Http"
import {Observable} from "rxjs"
export const actions = {
    QR_CODE_READ: 'QR_CODE_READ',
    REACTIVATE_SCANNER: 'REACTIVATE_SCANNER',
};

const actionCreators = {
    onQRCodeRead,
    reactivateQRCodeScanner,
};

function unescapeHtml(safe) {
    return safe.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

function handleQRCode(data) {
    let possibleQRCode = {};
    try {
        possibleQRCode = JSON.parse(unescapeHtml(data))
    } catch(e) {}
    const QRCodeData = possibleQRCode;
    const { authToken, authEndpoint, eventDetailsEndpoint }  = QRCodeData;
    if(!authToken || !authEndpoint || !eventDetailsEndpoint) {
        return Promise.resolve({ type: actions.QR_CODE_READ, payload: { error: true } })
    }
    else {
        return Promise.resolve({ type:navActions.GOTO_Feed, payload: { ...QRCodeData, reactivateQRScanner: false } })
    }
}

function reactivateQRCodeScanner() {
    return {
        type: 'REACTIVATE_SCANNER',
    };
}

function onQRCodeRead({ data }) {
    // check if valid QRCODE
    return handleQRCode(data)
}

function mapStateToProps(state) {
    return state.loginWithQRCode;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template);
