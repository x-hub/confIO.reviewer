import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {
    StyleProvider
} from 'native-base';
import store from './app.store';
import Navigator from 'app/Navigator';
import getTheme from 'nb-theme/components';
import materialTheme from 'nb-theme/variables/material';

const theme = getTheme(materialTheme);

export default class App extends Component {

    render() {

        return (
            <Provider store={ store } >
                <StyleProvider style={ theme }>
                    <Navigator/>
                </StyleProvider>
            </Provider>
        );
    }
}
