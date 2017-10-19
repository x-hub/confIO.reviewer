import React from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';
import {
    Button,
    Thumbnail,
    Icon,
} from 'native-base';
import style from './login.style';
import logo from 'assets/logo.png';

export default (props) => {
    const navigate = props.navigation.navigate;
    const ConfSelector = props.conf ?
        renderConfSelectorWithUpdate.bind(this, conf) :
        renderConfSelector.bind(this);

    return (
        <View style={ style.loginContainer }>
            <Image style={{ position: 'absolute',}} source={ require('assets/loginBackgroundImage.jpg') } />
            <View style={ style.loginContainer }>
                <View style={ style.logoContainer }>
                    <View style={ style.logoWrapper }>
                        <Thumbnail style={ style.logo } source={ logo } />
                    </View>
                </View>
                <View style={ style.confDetailsContainer }>
                    <ConfSelector />                                        
                </View>
            </View>
        </View>
    );

    function renderConfSelector() {
        return (
            <View>
                <Button style={ style.selectEventBtn }
                onPress={ navigate.bind(this, 'LoginWithQRCode') } rounded>
                    <Icon style={ style.icon } name='swap'/>
                    <Text style={ style.selectEvent }>Select Event</Text>
                </Button>
            </View>
        );
    }

    function renderConfSelectorWithUpdate({ type, name, logo }) {
        return (
            <View style={ style.eventInfos  }>
                <Text style={ style.eventType }>Selected { type }</Text>
                <Text style={ style.eventName }>{ name }</Text>
                <Image style={ style.eventLogo } source={ { uri: logo } } />
                <Button style={ style.selectEventBtn }
                onPress={ navigate.bind(this, 'LoginWithQRCode') } rounded>
                    <Icon style={ style.icon } name='swap'/>
                    <Text style={ style.selectEvent }>Change</Text>
                </Button>
            </View>
        );
    }
}




