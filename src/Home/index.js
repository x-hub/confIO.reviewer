import React, { Component } from 'react';
import {Text,View,Animated,PanResponder} from "react-native"
import template from './template';
import TalksData from  "app/Data/talks"
import { Container, Header, Content, Spinner ,Button} from 'native-base';

import {colors} from "shared/theme"
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            opacity : new Animated.Value(0),
            value:null,
        }
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {
                this.state.opacity.setOffset(this.state.opacity._value || 0);
                this.state.opacity.setValue(0);
            },
            onPanResponderMove: Animated.event([null, {dx: this.state.opacity}]),
            onPanResponderRelease: () => {
                this.state.opacity.flattenOffset();
               // Animated.spring(this.state.opacity,{toValue:this.state.opacity._value}).start()
                this.setState({
                    value:this.state.opacity._value
                })
            }
        });


    }
    componentDidMount() {
       // this.props.navigation.navigate('Detail', {slot:TalksData[1]})

    }
    render() {
        return(<Container>

            <Header backgroundColor={colors.primary} />
            <Content style={{position:"relative"}}>

               <Animated.View {...this._panResponder.panHandlers} style={{
                   transform:[
                       {translateX:this.state.opacity}
                   ],
                   backgroundColor:"#CCC",
                   width:80,height:80,}}>

               </Animated.View>
                <View>
                    <Text>{JSON.stringify(this.state.value)}</Text>
                </View>
                <Button onPress={()=> this.props.navigation.navigate('Detail')}><Text>To Detail</Text></Button>

            </Content>
        </Container>)
      //  return template(this.props);
    }

}
