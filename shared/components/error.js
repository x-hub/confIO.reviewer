import React from "react"
import {View, Text} from "react-native"
import {AutoPlayAnimation} from 'shared';
import {colors} from "shared/theme"
import style from "shared/components/sharedStyle"
import animations from "shared/animations"
export default (props) => {
    return (
        <View style={style.wrapper}>
            <AutoPlayAnimation
                style={style.animation}
                source={animations.error}
            />
            <Text style={style.label}>Please Connect to the Internet</Text>
        </View>
    )
}