import React, { Component } from 'react';
import template from './loginWithQRCode.template';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export const actions = {
    QR_CODE_READ: 'QR_CODE_READ',
};

const actionCreators = {
    onQRCodeRead
};
function onQRCodeRead(e) {
    return {
        type: actions.QR_CODE_READ,
        payload: e
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template);
