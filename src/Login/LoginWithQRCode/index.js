import React, { Component } from 'react';
import template from './loginWithQRCode.template';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AsyncStorage } from 'react-native';
import { creators as navActionCreators } from 'app/Navigator/navigator.actions';
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
        //possibleQRCode = JSON.parse(unescapeHtml(data))
        possibleQRCode = JSON.parse(data)
    } catch(e) {}
    const QRCodeData = possibleQRCode;
    const { authToken, authEndpoint, eventDetailsEndpoint }  = QRCodeData;
    if(!authToken || !authEndpoint || !eventDetailsEndpoint) {
        return Promise.resolve({ error: true })
    }
    else {
        return Promise.resolve({ ...QRCodeData, reactivateQRScanner: false })
    }
}

function reactivateQRCodeScanner() {
    return {
        type: 'REACTIVATE_SCANNER',
    };
}

function onQRCodeRead({ data }) {
    return navActionCreators.navigateToFeed(
      handleQRCode(data)
    )
}

function mapStateToProps(state) {
    return state.loginWithQRCode;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template);
