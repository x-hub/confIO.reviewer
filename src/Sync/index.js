import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import template from './sync.template';

const actions = {
};

const actionCreators = {
};


function mapStateToProps({}) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template);
