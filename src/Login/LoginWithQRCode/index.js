import React, { Component } from 'react';
import template from './loginWithQRCode.template';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { creators as navActionCreators } from 'app/Navigator/navigator.actions';
import {post} from "app/App/Services/Http"

export const actions = {
    QR_CODE_READ: 'QR_CODE_READ',
    REACTIVATE_SCANNER: 'REACTIVATE_SCANNER',
    INVALID_QRCODE_DATA : 'INVALID_QRCODE_DATA',
    BAD_CREDENTIALS : 'BAD_CREDENTIALS'
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
    let possibleQRCode = null;
    try {
        possibleQRCode = JSON.parse(unescapeHtml(data)) || {}
    } catch(e) {}
    const QRCodeData = possibleQRCode;
    const { authToken, authEndpoint, eventDetailsEndpoint }  = QRCodeData;
    if(!authToken || !authEndpoint || !eventDetailsEndpoint) {
        return { error: true }
    }
    else {
        return { ...QRCodeData, reactivateQRScanner: false }
    }
}

function reactivateQRCodeScanner() {
    return {
        type: actions.REACTIVATE_SCANNER
    };
}

async function onQRCodeRead({ data }) {
    let response =handleQRCode(data)
    if(response.error == true) {
        return {
            type : actions.INVALID_QRCODE_DATA
        }
    }else {
        try {
            const {authToken, authEndpoint} = response;
            const {status} = await authenticate(authEndpoint,authToken)
            return status == 200 ? navActionCreators.navigateToFeed(response) : {type:actions.BAD_CREDENTIALS}
        }catch (e) {
            return  {type:actions.BAD_CREDENTIALS}
        }
    }
}
async function authenticate(authEndpoint,authToken) {
     return post(authEndpoint, {
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({token: authToken}),
            credentials: 'include'
        }).toPromise()
}

function mapStateToProps(state) {
    return state.loginWithQRCode;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template);
