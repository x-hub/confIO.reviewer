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
        this.props.init({ talks, event, type })
    }

    render() {

        return (
            <Container>
                <Header backgroundColor={colors.primary}>
                    <Left>
                        <Button onPress={() => {
                            this.goBack()
                        }} transparent>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body style={{alignItems: 'flex-start'}}>
                    <Text style={styles.headerTitle}>
                        Talks List
                    </Text>
                    </Body>

                </Header>

                    <View style={{margin: 10}}>
                        <Swiper {...this.props} />
                    </View>

            </Container> )
    }
}

function Swiper(props) {
    if(props.talks && props.talks.length) {
        return renderSwiper(props)
    } else {
        return renderSwiperPlaceholder(props)
    }
}

function renderSwiper(props) {
    return (
            <DeckSwiper
                dataSource={props.talks}
                onSwipeRight={(e) => {
                    props.showDetail(props.event,e,props.type)
                }}
                renderItem={item =>
                    <Card style={{elevation: 3}}>
                        <CardItem>
                            <Text style={styles.title}>{item.title}</Text>
                            <Right style={styles.rateLater}>
                                {props.type == '' ?
                                    <Icon onPress={props.RateLater.bind(this,props.event,item)} name='md-time'/>
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
    )
}

function renderSwiperPlaceholder(props) {
    return (
            <View style={{alignSelf: 'center'}}>
                <Text>Empty</Text>
            </View>
    )
}
