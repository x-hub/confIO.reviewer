import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import template from './eventDetailsDialog.template';

export const actions = {
};
export const actionCreators = {
};

function mapStateToProps({ visible }) {
    return {
        visibile: visible,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template);
