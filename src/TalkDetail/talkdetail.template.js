import React, {Component} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {Body, Button, Card, CardItem, Container, Content, Header, Icon, Left, Right, Thumbnail} from 'native-base';
import Rating from "app/Rating"
import NestedSpeakersImgs from "./NestedImgs"
import SepakerDetail from "./SpeakerDetail/speakerdetail.template"
import SlidingUpPanel from 'rn-sliding-up-panel'
import Placeholder from 'rn-placeholder';
import {colors} from "shared/theme"
import styles from "./talkdetail.style"
import Orientation from "react-native-orientation"

const {height} = Dimensions.get('window')
const draggableRange = {
    top: height / 2,
    bottom: 0
}
export default class Template extends Component {

    constructor(props) {
        super(props)
        console.log(props)
        const params = this.props.navigation.state.params
        const {navigate, goBack} = this.props.navigation;
        this.navigate = navigate;
        this.goBack = goBack;
        this.score=0;
    }
    updateScore(value){
        this.score = value;
    }

    componentWillMount() {
        Orientation.addOrientationListener(this._orientationDidChange.bind(this));
    }

    componentDidMount() {

    }

    _orientationDidChange(orientation) {
        const {height} = Dimensions.get('window')
        // later
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange);
    }

    render() {

        return ( <Container>
            <Header style={styles.header}>
				<Left>
                    <Button onPress={ () => goBack() } transparent>
						<Icon style={ styles.goBackIcon } name='arrow-back' />
					</Button>
				</Left>
                <Body style={{alignItems: "flex-start"}}>
                <Text style={ styles.sceneTitle }>Talk Description</Text>
                </Body>
                <Right>
                    <Button transparent onPress={() => {
                        let {event,talk,type,updateHome} = this.props;
                        this.props.OnRate(event,talk,type,this.score,updateHome.bind(this));
                        this.props.toggleContentLoader(false)
                    }}>
                        <Icon style={ styles.reviewLaterIcon } name="md-checkmark-circle-outline"/>
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
                                onReady={this.props.IsReady}
                            >
                                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                    {NestedSpeakersImgs(styles, this.props)}
                                </View>
                            </Placeholder.ImageContent>
                        </View>
                    </View>

                    <View style={styles.contentTypes}>
                        <View style={{...styles.contentTypesItem, backgroundColor: colors.primary}}>
                            <Placeholder.Line
                                color="#FFF"
                                textSize={14}
                                onReady={this.props.IsReady}
                            >
                                <Text style={styles.contentTypesItemLabel}>{this.props.talk.track}</Text>
                            </Placeholder.Line>
                        </View>
                        <View style={{...styles.contentTypesItem, backgroundColor: colors.white}}>
                            <Placeholder.Line
                                color="#EEE"
                                textSize={14}
                                onReady={this.props.IsReady}
                            >
                                <Text style={{
                                    ...styles.contentTypesItemLabel,
                                    color: "black"
                                }}>{this.props.talk.talkType}</Text>
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
                                        onReady={this.props.IsReady}
                                    >
                                        <Text style={{fontFamily: "Roboto-Medium"}}>
                                            {this.props.talk.title}
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

                                    onReady={this.props.IsReady}
                                >
                                    <CardItem style={{marginLeft: 0, alignItems: "center"}}>
                                        <Body>

                                        <Text style={{fontFamily: "Roboto-Light"}}>
                                            {this.props.talk.summary}
                                        </Text>

                                        </Body>
                                    </CardItem>
                                </Placeholder.Paragraph>

                            </View>

                            <CardItem>
                                <Body style={{alignItems: "center"}}>
                                <Rating rate ={this.updateScore.bind(this)}/>
                                </Body>
                            </CardItem>
                        </Card>
                        <Text>

                        </Text>
                    </View>
                </View>
            </Content>
            <SlidingUpPanel
                allowDragging={false}
                draggableRange={draggableRange}
                ref={c => this.props._panel = c}
                visible={this.props.showSpeakerDetail}
                height={height / 1.75}
                onRequestClose={this.props.toggleSpeakerDetail.bind(this, false)}>
                <SepakerDetail height={height/1.75} speaker={this.props.selectedSpeaker}/>
            </SlidingUpPanel>
        </Container>)
    }
}


