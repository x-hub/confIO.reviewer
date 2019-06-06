import React from 'react';
import {Image} from "react-native"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from "app/App/actionsType"
import template from './feed.template';
import {creators as navActionCreators} from 'app/Navigator/navigator.actions';
import {actions} from "app/Login/LoginWithSavedSession/index"

import {fetchTalks} from 'app/App/Services/EventService';
import {from} from "rxjs";
// TODO : handle fallback image
export const defaultImgUrl = "https://www.baeldung.com/wp-content/uploads/2017/03/6bc93da96862fbfe63a25437a03d9bf2_400x400.png";
const actionCreators = {
    goHome,
    toggleAnimation,
    changeStatus
};

export function preFetchImg(url) {
    return from(Image.prefetch(url).catch((e) => Image.prefetch(defaultImgUrl)))
}

export function goHome(event) {
    return navActionCreators.navigateToHome(
        fetchTalks(event).toPromise()
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
