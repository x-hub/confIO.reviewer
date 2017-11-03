import React, {Component} from "react"
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
import trackImgs from "shared/trackImage"
import {colors} from "shared/theme"
import styles from "./talkswiper.styles"

export default class Template extends React.Component {
    constructor(props) {
        super(props)
        const {navigate, goBack} = this.props.navigation;
        this.navigate = navigate;
        this.goBack = goBack;
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
                    <Body style={{alignItems: "flex-start"}}>
                    <Text style={styles.headerTitle}>
                        Talks List
                    </Text>
                    </Body>

                </Header>
                <View style={{margin: 10}}>
                    <DeckSwiper
                        renderEmpty={() =>
                            <View style={{alignSelf: "center"}}>
                                <Text>Over</Text>
                            </View>
                        }
                        dataSource={this.props.current}
                        onSwipeRight={(e) => {
                            setTimeout(() => this.navigate('Detail', {slot: e}), 200)
                        }}
                        renderItem={item =>
                            <Card style={{elevation: 3}}>
                                <CardItem>
                                    <Text style={styles.title}>{item.talk.title}</Text>
                                    <Right style={styles.rateLater}>
                                        <Icon onPress={this.props.RateLater.bind(this, item)} name="md-time"/>
                                    </Right>
                                </CardItem>
                                <CardItem cardBody style={styles.body}>
                                    <Image style={styles.trackImg} source={trackImgs(item.talk.trackId)}/>
                                    <Text style={styles.trackLabel}>{item.talk.track}</Text>
                                </CardItem>
                                <CardItem>
                                    <Text style={styles.talkLabel}>{item.talk.talkType}</Text>
                                </CardItem>

                            </Card>
                        }
                    />
                </View>
            </Container> )
    }
}