import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from "app/App/actionsType"
import template from './home.template';


const actionCreators = {
    toNotReviewedTalks,
    toReviewedLaterTalks,
    toReviewedTalks

};
function toReviewedTalks() {
    return {
        type:ACTIONS.SET_REVIEWED_CURRENT
    }
}
function toReviewedLaterTalks() {
    return {
        type:ACTIONS.SET_REVIEWED_LATER_CURRENT
    }
}
function toNotReviewedTalks() {
    return {
        type:ACTIONS.SET_NOT_REVIEWED_CURRENT
    }
}
function mapStateToProps(state) {
    return {
        ...state.talkswiper
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(template)
