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
    Thumbnail
} from "native-base"
import nativeStorage from "app/App/Services/nativeStorage"
import styles from "./home.style"
import {colors} from "shared/theme"

const {width, height} = Dimensions.get("window");
const background = require("assets/Homebg.png");
import {TouchableCTA} from "./TouchableCTA/index"


export default (props) => {
    const {navigate, goBack} = props.navigation;
    nativeStorage.get(`${props.event.code}-activity`).subscribe((e)=>{
        console.log("data",e)
    })
    return (
        <View style={styles.container}>
            <Image source={background} style={styles.background} resizeMode="cover">
                <Container>
                    <Header style={{opacity: 0}} noShadow={true} backgroundColor="rgba(0,0,0,0.01)">
                        <Body>
                        <Text style={styles.labelM}>{props.event.name}</Text>
                        </Body>
                        <Right>
                            <Icon onPress={() => goBack()} style={{color: colors.white}} name="md-log-out"/>
                        </Right>
                    </Header>
                    <Content style={{flex: 1}}>
                        <View style={{
                            flex: 1,
                            justifyContent: "center", alignItems: "center"
                        }}>
                            <View style={{flexDirection: "row", ...styles.center}}>
                                <Thumbnail style={styles.avatar}
                                           source={{uri: props.user.pictureurl}}/>
                                <View style={{marginLeft: 16, alignItems: "center"}}>
                                    <Text style={{...styles.labelL, fontSize: 18}}>
                                        {props.user.firstName}
                                        {props.user.lastName}
                                    </Text>
                                    <Text style={{marginTop: 5, color: colors.gris}}>
                                        @{props.user.company}
                                    </Text>
                                </View>
                            </View>
                            <TouchableCTA
                                name='To Review'
                                onPress={props.toNotReviewedTalks}
                                backgroundColor='#78C4E8'
                                event={props.event}
                                list={props.talks}
                            />
                            <TouchableCTA
                                name='Reviewed'
                                onPress={props.toReviewedTalks}
                                backgroundColor='#e8a652'
                                event={props.event}
                                list={props.reviewed}
                            />
                            <TouchableCTA
                                name='To Review Later'
                                onPress={props.toReviewedLaterTalks}
                                backgroundColor='#E36B86'
                                event={props.event}
                                list={props.later}
                            />
                            <View style={{...styles.card}}>
                                <View style={{flex: 1, flexDirection: "row"}}>
                                    <Button iconLeft transparent
                                    style={{
                                        flex: 1,
                                        borderWidth: 1, padding: 15,
                                        borderColor: colors.white,
                                        justifyContent: 'center'
                                    }}
                                    onPress={ props.fetchActionsAndNavigateToSync.bind(this, props.event) }
                                    >
                                        <View style={{flexDirection: 'row'}}>
                                            <Icon style={{color: colors.white, textAlignVertical: 'center'}}
                                                  name='swap'/>
                                            <Text style={{
                                                color: colors.white,
                                                marginLeft: 5,
                                                textAlignVertical: 'center'
                                            }}>Sync With conf.io</Text>
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

