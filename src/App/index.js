import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {
    StyleProvider
} from 'native-base';
import Home from 'app/Home';
import Login from 'app/Login';
import LoginWithQRCode from 'app/Login/LoginWithQRCode';
import store from './app.store';
import getTheme from 'nb-theme/components';
import materialTheme from 'nb-theme/variables/material';
import TalkDetail from 'app/TalkDetail';


const theme = getTheme(materialTheme);
const Navigator = StackNavigator({
    Home: {
        screen: Home,
    },
    Login: {
        screen: Login,
    },
    LoginWithQRCode: {
        screen: LoginWithQRCode,
    },
    Detail:{
        screen: TalkDetail,
    }
}, {
    initialRouteName: 'Home',
    headerMode: 'none'
});


export default class App extends Component {

    render() {

        return (
            <Provider store={ store } >
                <StyleProvider style={ theme }>
                    <Navigator />
                </StyleProvider>
            </Provider>
        );
    }
}
