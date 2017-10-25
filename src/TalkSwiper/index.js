import React from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {ACTIONS} from "app/App/actionsType"
import template from "./talkswiper.template"

export const actionCreators = {
    RateLater
};

function RateLater(talk) {
    return {
        type: ACTIONS.TALK_RATE_LATER,
        payload: talk
    }
}

function mapStateToProps(state) {
    return state.talkswiper
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template)