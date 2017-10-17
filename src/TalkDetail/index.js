import React, {Component} from 'react';
import {Dimensions, Image, Text, TouchableHighlight, View} from 'react-native';
import {Body, Button, Card, CardItem, Container, Content, Header, Icon, Left, Right, Thumbnail} from 'native-base';
import Rating from "app/Rating"
import SlidingUpPanel from 'rn-sliding-up-panel'
import Orientation from 'react-native-orientation';
import {colors} from "shared/theme"

const styles = {
    Header: {backgroundColor: colors.primary, justifyContent: "center", alignItems: "center"},
    container: {
        flex: 1,
        backgroundColor: '#EAF0F2',
        alignItems: "center"

    },
    Label: {fontFamily: "Roboto-Medium", color: "white", fontSize: 20},
    speakers: {marginTop: 10, marginLeft: 10, width: "100%", position: "relative"},

    speakerBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: -10
    },
    speakerImg: {
        borderRadius: 35,
        height: 70,
        width: 70,
        borderColor: colors.white,
        borderWidth: 2
    },
    speakerImgMarginLeft: {
        marginLeft: -20,
    },
    //Content
    content: {flex: 1, backgroundColor: colors.gris, padding: 2},
    contentTypes: {marginTop: 10, width: "89%", flexDirection: "row"},
    contentTypesItem: {
        justifyContent: "center", padding: 10,
        flex: 1, alignItems: "center"
    },
    contentTypesItemLabel: {color: "white", fontFamily: "Roboto-Light"},
    contentBody: {flex: 1, width: "90%", zIndex: 0},
    //slideUp
    slideUp: {
        position: "relative", flex: 1, justifyContent: "flex-end",
        alignItems: "center", backgroundColor: colors.white
    },
    slideUpHeader: {flex: 1, padding: 10, backgroundColor: colors.primary, width: "100%"},
    slideUpUser: {
        marginTop: -55, width: "100%", flexDirection: "row",
        justifyContent: "center", alignItems: "center"
    },
    slideUpUserImg: {
        borderWidth: 2, borderColor: "white",
        width: 100, height: 100, borderRadius: 50
    },
    slideUpBody: {
        position: "relative", marginTop: 5,
        paddingLeft: 10, flex: 2, zIndex: -1,
        backgroundColor: colors.white, width: "100%"
    }

}
const {height} = Dimensions.get('window')
export default class TalkDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            draggableRange: {
                top: height / 1.75,
                bottom: 0
            },
            orientation: {}
        }
    }

    componentWillMount() {
        Orientation.addOrientationListener(this._orientationDidChange.bind(this));
    }

    componentDidMount() {

    }

    _orientationDidChange = (orientation) => {
        const {height} = Dimensions.get('window')
        this.setState({
            draggableRange: {
                top: height / 1.75,
                bottom: 0
            }
        })
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange);
    }

    generateSpeakers() {
        let speakers = [];
        for (let i = 0; i < 3; i++) {
            speakers.push(<View key={i}>
                <TouchableHighlight style={{...styles.speakerImg, zIndex: i * -1, marginLeft: (i != 0 ? -10 : 0)}}
                                    onPress={() => {
                                        this.setState({visible: true})
                                    }}>
                    <Image
                        style={{height: 66, width: 66, borderRadius: 33}}
                        source={{uri: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAA3QAAAAJGQ0Yzk2ODIzLTY4OTAtNGJmNS1hYjQzLTg5OGRjNTYwMWE3YQ.jpg'}}
                    />
                </TouchableHighlight>

            </View>)

        }
        if (speakers.length == 1) {
            speakers.push(<View key={speakers.length + 1}>
                <Text style={{marginLeft: 10, fontSize: 30, fontWeight: "100", fontFamily: "Roboto-Light"}}>text</Text>
            </View>)
        }
        return speakers;
    }

    updateRating() {

    }

    render() {
        return (
            <Container>
                <Header style={styles.Header}>
                    <Left>
                        <Button onPress={() => {
                            this.props.navigation.goBack()
                        }} transparent>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body style={{alignItems: "flex-start"}}>
                    <Text style={styles.Label}>
                        Talk Detail
                    </Text>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon style={{color: "white"}} name="md-checkmark-circle-outline"/>
                        </Button>
                    </Right>
                </Header>
                <Content style={styles.content}>
                    <View style={styles.container}>
                        <View style={styles.speakers}>

                            <View style={[styles.speakerBar, {marginTop: 10}]}>
                                {this.generateSpeakers()}
                            </View>
                        </View>

                        <View style={styles.contentTypes}>
                            <View style={{...styles.contentTypesItem, backgroundColor: colors.primary}}>
                                <Text style={styles.contentTypesItemLabel}>Architecture et
                                    sécurité</Text>
                            </View>
                            <View style={{padding: 10, backgroundColor: colors.white, flex: 1, alignItems: "center"}}>
                                <Text style={{...styles.contentTypesItemLabel, color: "black"}}>University</Text>
                            </View>

                        </View>

                        <View style={styles.contentBody}>
                            <Card>
                                <CardItem>
                                    <Left>
                                        <Body>
                                        <Text style={{fontFamily: "Roboto-Medium"}}>
                                            Orchestration de conteneurs : Swarm & kubernetes
                                        </Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem style={{marginLeft: 0, alignItems: "center"}}>
                                    <Body>
                                    <Text style={{fontFamily: "Roboto-Light"}}>
                                        Les architectures microservices sont bien adaptées aux applications cloud native
                                        & ready, mais comme tous systèmes distribués à grande échelle génèrent une
                                        complexité opérationnelle très importante. Quand vous avez des 10 milliers de
                                        machines avec des centaines de milliers de composants avec chacun 2 ou 3
                                        replicas et vous avez potentiellement des milliards d’objets. Il est impossible
                                        de gérer tout ceci manuellement car il y trop de combinaisons et de pièces de
                                        mouvement. Pour en réaliser les bénéfices, il va falloir vous appuyer sur une
                                        plateforme d’exécution et d’orchestration pour simplifier la mise en œuvre,
                                        gérer le passage à l'échelle, assurer la disponibilité des services, simplifier
                                        le déploiement, optimiser l’usage des ressources... Venez découvrir les
                                        nouveautés des plateformes d’orchestration des conteneurs (Swarm, Kubernetes +
                                        Openshift) en mettant le focus sur Swarm Mode.
                                    </Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Body style={{alignItems: "center"}}>
                                    <Rating/>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>
                        <View><Text>{JSON.stringify(this.state.draggableRange)}</Text></View>

                    </View>
                </Content>
                <SlidingUpPanel
                    draggableRange={this.state.draggableRange}
                    ref={c => this._panel = c}
                    visible={this.state.visible}
                    height={height / 1.75}
                    onRequestClose={() => this.setState({visible: false})}>
                    <View style={styles.slideUp}>
                        <View style={styles.slideUpHeader}>
                        </View>
                        <View style={styles.slideUpUser}>
                            <Image style={styles.slideUpUserImg}
                                   source={{uri: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAA3QAAAAJGQ0Yzk2ODIzLTY4OTAtNGJmNS1hYjQzLTg5OGRjNTYwMWE3YQ.jpg'}}/>
                            <View style={{marginLeft: 10}}>
                                <Text style={styles.Label}>
                                    BASSI Hassan
                                </Text>
                                <Text style={{fontFamily: "Roboto-Light"}}>
                                    @XHub
                                </Text>
                            </View>
                        </View>
                        <View style={styles.slideUpBody}>

                            <Text
                                style={{fontWeight: "400", color: "black", marginTop: 10, fontFamily: "Roboto-Light"}}>Architecte
                                des applications cloud / Blockchain & IT Governance dans la direction technique
                                Carrefour. Je fournis des services d'accompagnement pour accélérer les mutations de la
                                DSI Carrefour : Déploiement Cloud privé/public, processus Agile, organisation Dev Ops,
                                Architecture & Design de microservices, serverless et Blockchain.</Text>
                        </View>
                    </View>

                </SlidingUpPanel>
            </Container>
        )
    }
}