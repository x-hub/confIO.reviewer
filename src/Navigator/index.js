import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Home from 'app/Home';
import Login from 'app/Login';
import LoginWithQRCode from 'app/Login/LoginWithQRCode';
import LoginWithSavedSession from 'app/Login/LoginWithSavedSession';
import TalkDetail from 'app/TalkDetail';
import TalkSwiper from 'app/TalkSwiper'
import Sync from 'app/Sync';
import Feed from 'app/Feed'
import _ from 'lodash';

const screens = {
    Home,
    Login,
    LoginWithQRCode,
    LoginWithSavedSession,
    Detail: TalkDetail,
    Swiper: TalkSwiper,
    Sync,
    Feed,
};

function GOTOActions() {
    return _.mapValues(
        screens,
        (value, key) => {
            return `GOTO_${key}`;
        }
    );
}

function navigatorConfig() {
    return _.mapValues(
        screens,
        (value, key) => {
            return { screen: value };
        }
    );
}

export const Navigator = (
    StackNavigator(
        navigatorConfig()
        , {
            headerMode: 'none',
        }
    )
);

const NavigatorWithState = (props) => {
    return (
        <Navigator
        navigation={ addNavigationHelpers({ dispatch: props.dispatch, state: props.nav }) }
        />
    );
}

function mapStateToProps(state) {
    return { nav: state.nav }
}

export default connect(mapStateToProps)(NavigatorWithState);


