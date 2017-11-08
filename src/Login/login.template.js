import React from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {Button, Icon, Thumbnail,} from 'native-base';
import style from './login.style';
import logo from 'assets/logo.png';

export default (props) => {
    const navigate = props.navigation.navigate;
    const EventSelector = props.event ?
        renderEventSelectorWithUpdate.bind(this, props.event) :
        renderEventSelector.bind(this);
    const { navigateToQRScanner, navigateToHome } = props;

    return (
        <View style={style.loginContainer}>
            <Image style={{position: 'absolute', width: '100%', height: '100%', top: 0, right: 0, left: 0, bottom: 0}}
                   source={require('assets/loginBackgroundImage.jpg')}/>
            <View style={style.loginContainer}>
                <View style={style.logoContainer}>
                    <View style={style.logoWrapper}>
                        <Thumbnail style={style.logo} source={logo}/>
                    </View>
                </View>
                <View style={style.eventDetailsContainer}>
                    <EventSelector/>
                </View>
            </View>
        </View>
    );

    function renderEventSelector() {
        return (
            <View>
                <Button style={style.selectEventBtn}
                        onPress={ navigateToQRScanner } rounded>
                    <Icon style={style.icon} name='swap'/>
                    <Text style={style.selectEvent}>Select Event</Text>
                </Button>
            </View>
        );
    }

    function renderEventSelectorWithUpdate(event) {
        const { type, name, image } = event;
        return (
            <View style={ style.eventInfos }>
                <Text style={ style.eventType }>Selected { type }</Text>
                <TouchableOpacity
                onPress={ navigateToHome.bind(this, event) }
                >
                    <Text style={ style.eventName }>{ name }</Text>
                    <View style={ style.eventImageContainer }>
                        <Image style={ style.eventImage } source={ {uri: image} }/>
                    </View>
                </TouchableOpacity>
                <Button style={ style.selectEventBtn }
                        onPress={ navigate.bind(this, 'LoginWithQRCode') } rounded>
                    <Icon style={ style.icon } name='swap'/>
                    <Text style={ style.selectEvent }>Change</Text>
                </Button>
            </View>
        );
    }
}




