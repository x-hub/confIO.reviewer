import React from 'react';
import {Image} from "react-native"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from "app/App/actionsType"
import template from './feed.template';
import {creators as navActionCreators} from 'app/Navigator/navigator.actions';
import {actions} from "app/Login/LoginWithSavedSession/index"

import {Observable} from "rxjs"
import {fetchTalks} from 'app/App/Services/EventService';

export const defaultImgUrl = "http://blog.xebia.fr/images/devoxxuk-2014-logo.png";
const actionCreators = {
    GOTOHome,
    toggleAnimation,
    changeStatus
};

export function preFetchImg(url) {
    return Observable.fromPromise(Image.prefetch(url).catch((e) => Image.prefetch(defaultImgUrl)))
}

export function GOTOHome(event) {
    return navActionCreators.navigateToHome(
        fetchTalks(event)
    )
}

function toggleAnimation(payload) {
    return {
        type: ACTIONS.ANIMATION_TOGGLE,
        payload
    }
}

function changeStatus(payload) {
    return {
        type: ACTIONS.CHANGE_STATUS,
        payload
    }
}

function mapStateToProps(state) {
    return {
        ...state.feed
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(template)
