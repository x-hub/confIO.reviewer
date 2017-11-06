import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import {
    StackNavigator,
    addNavigationHelpers,
    NavigationActions,
} from 'react-navigation';
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

class NavigatorWithState extends Component {
	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
	}

	onBackPress() {
		const { dispatch, nav } = this.props;
		if(nav.index === 0) {
			return false;
		} else {
			dispatch(NavigationActions.back());
			return true;
		}
	}

    render() {
		const { dispatch, nav } = this.props;
        return (
            <Navigator
            navigation={ addNavigationHelpers({ dispatch: dispatch, state: nav }) }
            />
        );
    }
}

function mapStateToProps(state) {
    return { nav: state.nav }
}

function mapDispatchToProps(dispatch) {
	return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigatorWithState);


