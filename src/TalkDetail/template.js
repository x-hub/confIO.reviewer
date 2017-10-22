import React from 'react';
import {Text, View,Dimensions,TouchableHighlight,Image} from 'react-native';
import {Body, Button, Card, CardItem, Container, Content, Header, Icon, Left, Right, Thumbnail} from 'native-base';
import Rating from "app/Rating"
import SpeakerDetail from "./SpeakerDetail"
import SlidingUpPanel from 'rn-sliding-up-panel'
import Placeholder from 'rn-placeholder';
import {colors} from "shared/theme"
const {height} = Dimensions.get('window')
export default (styles, props,slot) => {
    const { navigate, goBack } = props.navigation;
    const draggableRange = {
        top: height / 2,
        bottom: 0
    }
    return ( <Container>
        <Header style={styles.Header}>
            <Left>
                <Button onPress={()=>goBack()} transparent>
                    <Icon name='arrow-back'/>
                </Button>
            </Left>
            <Body style={{alignItems: "flex-start"}}>
            <Text style={styles.Label}>
                Talk Detail
            </Text>
            </Body>
            <Right>
                <Button transparent onPress={() => {
                    props.OnRate(slot)
                    goBack()
                }}>
                    <Icon style={{color: "white"}} name="md-checkmark-circle-outline"/>
                </Button>

            </Right>
        </Header>

        <Content style={styles.content}>
            <View style={styles.container}>
                <View style={styles.speakers}>
                    <View style={[styles.speakerBar, {marginTop: 10}]}>
                    <Placeholder.ImageContent
                        size={60}
                        animate="fade"
                        color="#CCC"
                        lineNumber={4}
                        lineSpacing={5}
                        lastLineWidth="30%"
                        onReady={props.IsReady}
                    >
                        <View style={{flexDirection:"row"}}>
                        {generateSpeakers(styles,props)}
                        </View>
                    </Placeholder.ImageContent>
                    </View>
                </View>

                <View style={styles.contentTypes}>
                    <View style={{...styles.contentTypesItem, backgroundColor: colors.primary}}>
                        <Placeholder.Line
                            color="#FFF"
                            textSize={14}
                            onReady={props.IsReady}
                        >
                            <Text style={styles.contentTypesItemLabel}>{slot.talk.track}</Text>
                        </Placeholder.Line>
                    </View>
                    <View style={{...styles.contentTypesItem, backgroundColor: colors.white}}>
                        <Placeholder.Line
                            color="#EEE"
                            textSize={14}
                            onReady={props.IsReady}
                        >
                            <Text style={{
                                ...styles.contentTypesItemLabel,
                                color: "black"
                            }}>{slot.talk.talkType}</Text>
                        </Placeholder.Line>
                    </View>

                </View>
                <View style={styles.contentBody}>
                    <Card>
                        <CardItem>
                            <Left>
                                <Body>
                                <Placeholder.Line
                                    color="#EEE"
                                    width="77%"
                                    textSize={14}
                                    onReady={props.IsReady}
                                >
                                    <Text style={{fontFamily: "Roboto-Medium"}}>
                                        {slot.talk.title}
                                    </Text>
                                </Placeholder.Line>
                                </Body>
                            </Left>
                        </CardItem>
                        <View style={{margin: 20, marginTop: 5}}>
                            <Placeholder.Paragraph
                                lineNumber={4}
                                textSize={14}
                                lineSpacing={5}
                                color="#EEE"

                                onReady={props.IsReady}
                            >
                                <CardItem style={{marginLeft: 0, alignItems: "center"}}>
                                    <Body>

                                    <Text style={{fontFamily: "Roboto-Light"}}>
                                        {slot.talk.summary}
                                    </Text>

                                    </Body>
                                </CardItem>
                            </Placeholder.Paragraph>

                        </View>

                        <CardItem>
                            <Body style={{alignItems: "center"}}>
                            <Rating/>
                            </Body>
                        </CardItem>
                    </Card>
                    <Text>

                    </Text>
                </View>
            </View>
        </Content>
        <SlidingUpPanel
            draggableRange={draggableRange}
            ref={c => props._panel = c}
            visible={props.showSpeakerDetail}
            height={height / 1.75}
            onRequestClose={props.toggleSpeakerDetail.bind(this, false)}>
            {SpeakerDetail(props.selectedSpeaker)}
        </SlidingUpPanel>
    </Container>)
}
function generateSpeakers(styles,props){
    let speakersView = [];
    props.speakers.forEach((speaker, i) => {
        speakersView.push(<View key={i}>
            <TouchableHighlight style={{...styles.speakerImg, zIndex: i * -1, marginLeft: (i != 0 ? -10 : 0)}}
                                onPress={props.getSpeaker.bind(this, i)}>
                <Image
                    style={{height: 66, width: 66, borderRadius: 33}}
                    source={{uri: speaker.avatarURL}}
                />
            </TouchableHighlight>
        </View>)

    })
    if (props.speakers.length == 1) {
        speakersView.push(<View key={props.speakers.length + 1}>
            <Text style={{
                marginLeft: 10,
                fontSize: 30,
                fontWeight: "100",
                fontFamily: "Roboto-Light"
            }}>{props.speakers[0].firstName} {props.speakers[0].lastName}</Text>
        </View>)
    }
    return speakersView;
}