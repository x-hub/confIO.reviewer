import React, {Component} from "react"
import { Image,TouchableHighlight } from 'react-native';
import { Container, Header, View,Button, DeckSwiper, Card, CardItem, Thumbnail, Text, Left,Right, Body, Icon } from 'native-base';
import trackImgs from "shared/trackImage"
import {colors} from "shared/theme"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import  {actionCreators} from "./actions.factory"

class TalkSwiper extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { navigate, goBack } = this.props.navigation;
        return (  <Container>
            <Header backgroundColor={colors.primary}  >
                <Left>
                    <Button onPress={() => {
                        goBack()
                    }} transparent>
                        <Icon name='arrow-back'/>
                    </Button>
                </Left>
                <Body style={{alignItems: "flex-start"}}>
                <Text style={{fontFamily: "Roboto-Medium", color: "white", fontSize: 20}}>
                    Talks List
                </Text>
                </Body>

            </Header>
            <View style={{margin:10}}>

                <DeckSwiper
                    renderEmpty={() =>
                        <View style={{alignSelf: "center"}}>
                            <Text>Over</Text>
                        </View>
                    }
                    dataSource={this.props.current}
                    onSwipeRight={(e)=>{setTimeout(()=>navigate('Detail',{slot:e}),200)}}
                    renderItem={item =>
                        <Card style={{ elevation: 3 }}>
                            <CardItem>

                                <Text  style={{flex:1,fontFamily:"Roboto-Light"}}>{item.talk.title}</Text>

                                <Right style={{flex:0,marginLeft:6}}>
                                    <Icon onPress={this.props.RateLater.bind(this,item)}  name="md-time" />
                                </Right>

                            </CardItem>
                            <CardItem cardBody style={{justifyContent:"center",
                                alignItems:"center",flexDirection:"column",
                                backgroundColor:colors.primary,height:250}}>
                                <Image style={{ height: 80, width:80 }} source={trackImgs(item.talk.trackId)} />
                                <Text style={{fontSize:20,color:colors.white,fontFamily:"Roboto-Light"}}>{item.talk.track}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{fontFamily:"Roboto-Light"}}>{item.talk.talkType}</Text>
                            </CardItem>

                        </Card>
                    }
                />
            </View>
        </Container> )
    }
}

function mapStateToProps(state) {
    return state.swiper
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TalkSwiper)