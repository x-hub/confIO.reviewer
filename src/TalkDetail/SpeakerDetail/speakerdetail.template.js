import React from "react"
import {Image, Text, View,ScrollView} from "react-native"
import style from "./speakerdetail.style"

export default (props) => {
    const {height} = props;
    return (
        <View style={style.slideUp}>
            <View style={{...style.slideUpHeader,height:height*0.2}}>
            </View>
            <View style={style.slideUpUser}>
                <Image style={style.slideUpUserImg}
                       source={{uri: props.speaker.avatarURL}}/>
                <View style={{marginLeft: 10}}>
                    <Text style={style.Label}>
                        {props.speaker.firstName}
                        {props.speaker.lastName}
                    </Text>
                    <Text style={{fontFamily: "Roboto-Light"}}>
                        @{props.speaker.company}
                    </Text>
                </View>
            </View>
            <ScrollView style={{...style.slideUpBody,height:height*0.8}}>
                <Text
                    style={style.slideUpBio}>
                    {props.speaker.bio}
                </Text>
            </ScrollView>
        </View>
    )
}