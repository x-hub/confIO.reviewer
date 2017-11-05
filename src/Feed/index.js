import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from "app/App/actionsType"
import template from './feed.template';
import navActions from 'app/Navigator/navigator.actions';
import {actions} from "app/Login/LoginWithSavedSession/index"
import {fetchTalks} from "app/Login"
const actionCreators = {
    GOTOHome
};

export function GOTOHome(event) {
    return fetchTalks(event).then((payload)=>{
        return {
            type:navActions.GOTO_Home,
            payload
        }
    })

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
