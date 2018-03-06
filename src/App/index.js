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
import animations from 'shared/animations';
import { PermissionsAndroid } from 'react-native';

const theme = getTheme(materialTheme);

export default class App extends Component {
    async componentWillMount(){
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'ConfIoReviewer App Camera Permission',
                    'message': 'ConfIoReviewer App needs access to your camera ' +
                    'so you can take awesome pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            //
        }
    }

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
