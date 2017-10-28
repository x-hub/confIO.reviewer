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
    TouchableOpacity
} from "native-base"
import styles from "./home.style"
import {colors} from "shared/theme"
const {width, height} = Dimensions.get("window");
const background = require("assets/Homebg.png");


export default (props) => {
    const { navigate, goBack } = props.navigation;
    return (
        <View style={styles.container}>
            <Image source={background} style={styles.background} resizeMode="cover">
                <Container>
                    <Header style={{Opacity: 0}} noShadow={true} backgroundColor="rgba(0,0,0,0.01)">
                        <Body>
                        <Text style={styles.labelM}>DevoxxMA
                            2017</Text>
                        </Body>
                        <Right>
                            <Icon style={{color: colors.white}} name="md-log-out"/>
                        </Right>
                    </Header>
                    <Content style={{flex: 1}}>
                        <View style={{
                            flex: 1,
                            justifyContent: "center", alignItems: "center"
                        }}>
                            <View style={{flexDirection: "row", ...styles.center}}>
                                <Thumbnail style={styles.avatar}
                                           source={{uri: 'https://lh6.googleusercontent.com/-0SpETtlSIGY/AAAAAAAAAAI/AAAAAAAAAA4/_6bdXciDHB0/photo.jpg'}}/>
                                <View style={{marginLeft: 16, alignItems: "center"}}>
                                    <Text style={{...styles.labelL, fontSize: 18}}>
                                        JHIPSTER Toto
                                    </Text>
                                    <Text style={{marginTop: 5, color: colors.gris}}>
                                        @Java
                                    </Text>
                                </View>

                            </View>

                            <View style={{...styles.card, backgroundColor: "#78C4E8"}}>
                                <View style={{...styles.center, flex: 1, flexDirection: "row"}}>
                                    <Text style={{...styles.labelL, fontSize: 33, color: colors.black}}>{props.talksNotReviewed.length}</Text>
                                    <Text style={{fontFamily: "Roboto-Light", fontSize: 22, marginLeft: 10}}>Not
                                        Reviewed</Text>
                                </View>
                                <View style={{marginHorizontal: 10}}>
                                    <Button style={{alignSelf: "stretch"}} transparent><Icon
                                        style={{color: colors.white}} name="md-arrow-dropright"/></Button>
                                </View>
                            </View>
                            <View style={{...styles.card, backgroundColor: "#e8a652"}}>
                                <View style={{...styles.center, flex: 1, flexDirection: "row"}}>
                                    <Text style={{...styles.labelL, fontSize: 33, color: colors.black}}>{props.talksReviewed.length}</Text>
                                    <Text style={{
                                        fontFamily: "Roboto-Light",
                                        fontSize: 22,
                                        marginLeft: 10
                                    }}>Reviewed</Text>
                                </View>
                                <View style={{marginHorizontal: 10}}>
                                    <Button style={{alignSelf: "stretch"}} transparent><Icon
                                        style={{color: colors.white}} name="md-arrow-dropright"/></Button>
                                </View>
                            </View>
                            <View style={{...styles.card, backgroundColor: "#E36B86"}}>
                                <View style={{...styles.center, flex: 1, flexDirection: "row"}}>
                                    <Text style={{...styles.labelL, fontSize: 33, color: colors.black}}>{props.talksToBeReviewedLater.length}</Text>
                                    <Text style={{fontFamily: "Roboto-Light", fontSize: 22, marginLeft: 10}}>To
                                        Review</Text>
                                </View>
                                <View style={{marginHorizontal: 10}}>
                                    <Button style={{alignSelf: "stretch"}} transparent><Icon
                                        style={{color: colors.white}} name="md-arrow-dropright"/></Button>
                                </View>
                            </View>


                            <View style={{marginTop: 10}}>
                                <Button style={{
                                    borderWidth: 1, padding: 15,
                                    borderColor: colors.white, justifyContent: "space-between"
                                }} iconLeft transparent>
                                    <Icon style={{color: colors.white}} name='swap'/>
                                    <Text style={{color: colors.white, marginLeft: 5}}>Sync Your Reviewers</Text>
                                </Button>
                            </View>
                        </View>
                    </Content>
                </Container>
            </Image>
        </View>

    );
}

