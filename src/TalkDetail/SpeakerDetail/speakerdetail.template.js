import React from "react"
import {Image, Text, View} from "react-native"
import style from "./speakerdetail.style"

export default (props) => {
    return (
        <View style={style.slideUp}>
            <View style={style.slideUpHeader}>
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
            <View style={style.slideUpBody}>

                <Text
                    style={{fontWeight: "400", color: "black", marginTop: 10, fontFamily: "Roboto-Light"}}>
                    {props.speaker.bio}
                </Text>
            </View>
        </View>
    )
}