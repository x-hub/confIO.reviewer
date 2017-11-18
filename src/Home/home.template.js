import React, {Component} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';
import {
    Badge,
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Header,
    Icon,
    Left,
    Right,
    Thumbnail,
} from "native-base"
import {
    TouchableOpacity
} from 'react-native';
import styles from "./home.style"
import {colors} from "shared/theme"
const {width, height} = Dimensions.get("window");
const background = require("assets/Homebg.png");

function TouchableCTA(props) {
    const { backgroundColor, list, event, onPress, name } = props;
    const CTAContainer = list.length? EnabledCTA : DisabledCTA;
    return (
        <CTAContainer>
            <View style={{...styles.center, flex: 1, flexDirection: "row"}}>
                <Text style={{...styles.labelL, fontSize: 33, color: colors.black}}>{list.length}</Text>
                <Text style={{fontFamily: "Roboto-Light", fontSize: 22, marginLeft: 10}}>{ name }</Text>
            </View>
            <View style={{marginHorizontal: 10, justifyContent: 'center'}}>
                {list.length ?  <View style={{alignSelf: 'stretch'}}>
                    <Icon style={{color: colors.black}} name="md-arrow-dropright"/>
                </View> :<View/>}
            </View>
        </CTAContainer>
    );

    function EnabledCTA(props) {
        return (
            <TouchableOpacity
            onPress={()=>{onPress(event, list)}}
            style={{ ...styles.card, backgroundColor }}
            >
                { props.children }
            </TouchableOpacity>
        );
    }

    function DisabledCTA(props) {
        return (
            <View style={{ ...styles.card, backgroundColor }}>
                { props.children }
            </View>
        );
    }
}

export default (props) => {
    const { navigate, goBack } = props.navigation;
    const {
        user,
        event,
        talks,
        reviewed,
        later,
    } = props.navigation.state.params;
    const {
        toNotReviewedTalks,
        toReviewedLaterTalks,
        toReviewedTalks,
    } = props;
    return (
        <View style={styles.container}>
            <Image source={background} style={styles.background} resizeMode="cover">
                <Container>
                    <Header style={{opacity: 0}} noShadow={true} backgroundColor="rgba(0,0,0,0.01)">
                        <Body>
                        <Text style={styles.labelM}>{event.name}</Text>
                        </Body>
                        <Right>
                            <Icon onPress={()=>goBack()} style={{color: colors.white}} name="md-log-out"/>
                        </Right>
                    </Header>
                    <Content style={{flex: 1}}>
                        <View style={{
                            flex: 1,
                            justifyContent: "center", alignItems: "center"
                        }}>
                            <View style={{flexDirection: "row", ...styles.center}}>
                                <Thumbnail style={styles.avatar}
                                           source={ {uri: user.pictureurl} }/>
                                <View style={{marginLeft: 16, alignItems: "center"}}>
                                    <Text style={{...styles.labelL, fontSize: 18}}>
                                        {user.firstName}
                                        {user.lastName}
                                    </Text>
                                    <Text style={{marginTop: 5, color: colors.gris}}>
                                        @{ user.company }
                                    </Text>
                                </View>

                            </View>

                            <TouchableCTA
                            name='To Review'
                            onPress={ toNotReviewedTalks }
                            backgroundColor='#78C4E8'
                            event={ event }
                            list={ talks }
                            />

                            <TouchableCTA
                            name='Reviewed'
                            onPress={ toReviewedTalks }
                            backgroundColor='#e8a652'
                            event={ event }
                            list={ reviewed }
                            />

                            <TouchableCTA
                            name='To Review Later'
                            onPress={ toReviewedLaterTalks }
                            backgroundColor='#E36B86'
                            event={ event }
                            list={ later }
                            />

                            <View style={{ ...styles.card }}>
                                <View style={{flex: 1, flexDirection: "row"}}>
                                    <Button iconLeft transparent
                                    style={{
                                        flex: 1,
                                        borderWidth: 1, padding: 15,
                                        borderColor: colors.white,
                                        justifyContent: 'center'
                                    }}
                                    onPress={ navigate.bind(this, 'Sync') }
                                    >
                                        <View style={ {flexDirection: 'row'} }>
                                            <Icon style={ {color: colors.white, textAlignVertical: 'center'} } name='swap'/>
                                            <Text style={ {color: colors.white, marginLeft: 5, textAlignVertical: 'center'} }>Sync With conf.io</Text>
                                        </View>
                                    </Button>
                                </View>
                            </View>

                            <View style={{...styles.card, marginTop: 10}}>
                            </View>
                        </View>
                    </Content>
                </Container>
            </Image>
        </View>

    );
}

