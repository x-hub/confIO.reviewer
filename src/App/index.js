import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import Home from 'app/Home';
import Login from 'app/Login';
import TalkDetail from 'app/TalkDetail';

const store = createStore(() => {});

const Navigator = StackNavigator({
    Login: {
        screen: Login,
    },
    Home: {
        screen: Home,
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
                <Navigator />
            </Provider>
        );
    }
}
