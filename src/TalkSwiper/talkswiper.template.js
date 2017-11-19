import React, {Component} from 'react'
import {Image} from 'react-native';
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    DeckSwiper,
    Header,
    Icon,
    Left,
    Right,
    Text,
    Thumbnail,
    View
} from 'native-base';
import trackImgs from 'shared/trackImage'
import {colors} from 'shared/theme'
import styles from './talkswiper.styles'

export default class Template extends React.Component {
    constructor(props) {
        super(props)
        const { talks, event, type } = this.props.navigation.state.params
        const {navigate, goBack} = this.props.navigation;
        this.navigate = navigate;
        this.goBack = goBack;
    }

    render() {

        return (
            <Container>
                <Header style={ styles.header }>
                    <Left>
                        <Button onPress={ () => this.goBack() } transparent>
                            <Icon style={ styles.goBackIcon } name='arrow-back' />
                        </Button>
                    </Left>
                    <Text style={ styles.sceneTitle }>Talks Deck</Text>
                </Header>

                    <View style={{margin: 10}}>
                        <DeckSwiper
                            dataSource={this.props.talks}
                            onSwipeRight={(e) => {
                                console.debug(e)
                                this.props.showDetail(this.props.event,e,this.props.type)
                            }}
                            renderItem={item =>
                                <Card style={{elevation: 3}}>
                                    <CardItem>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Right style={styles.rateLater}>
                                            {this.props.type == '' ?
                                                <Icon onPress={this.props.RateLater.bind(this,this.props.event,item)} name='md-time'/>
                                                : <View />
                                            }
                                        </Right>
                                    </CardItem>
                                    <CardItem cardBody style={styles.body}>
                                        <Image style={styles.trackImg} source={trackImgs(item.trackId)}/>
                                        <Text style={styles.trackLabel}>{item.track}</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Text style={styles.talkLabel}>{item.talkType}</Text>
                                    </CardItem>

                                </Card>
                            }
                        />
                    </View>

            </Container> )
    }
}

