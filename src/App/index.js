import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Home from 'app/Home';
import Login from 'app/Login';
import store from './app.store';

const Navigator = StackNavigator({
    Login: {
        screen: Login,
    },
    Home: {
        screen: Home,
    }
}, {
    initialRouteName: 'Login',
    headerMode: 'none'
});


export default class App extends Component {

    render() {
        return (
            <Provider store={ store } >
                <Navigator />
            </Provider>
        );
    }
}
