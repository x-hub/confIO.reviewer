import React from "react"
import {View,Text,Image} from "react-native"
import style from "./style"
export default (speaker)=>{
    return(
        <View style={style.slideUp}>
            <View style={style.slideUpHeader}>
            </View>
            <View style={style.slideUpUser}>
                <Image style={style.slideUpUserImg}
                       source={{uri: speaker.avatarURL}}/>
                <View style={{marginLeft: 10}}>
                    <Text style={style.Label}>
                        {speaker.firstName}
                        {speaker.lastName}
                    </Text>
                    <Text style={{fontFamily: "Roboto-Light"}}>
                        @{speaker.company}
                    </Text>
                </View>
            </View>
            <View style={style.slideUpBody}>

                <Text
                    style={{fontWeight: "400", color: "black", marginTop: 10, fontFamily: "Roboto-Light"}}>
                    BIOGRAPHIE TBD
                </Text>
            </View>
        </View>
    )
}