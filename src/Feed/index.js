import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from "app/App/actionsType"
import template from './feed.template';


const actionCreators = {
    initTalks,
    initSpeakers
};

function initTalks(event, talks) {
    return {
        type: ACTIONS.INIT_TALKS,
        payload: {event, talks}
    }
}

function initSpeakers(event, speakers) {
    return {
        type: ACTIONS.INIT_SPEAKERS,
        payload: {event, speakers}
    }
}

function mapStateToProps(state) {
    return {
        ...state.login
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template)
