import React from "react"
import {View,Text} from "react-native"
import { AutoPlayAnimation } from 'shared';
import style from "shared/components/sharedStyle"
import animations from "shared/animations"
export default (props) => {
    return (
        <View style={style.wrapper}>
            <AutoPlayAnimation
                style={style.animation}
                source={ props.loaded ? animations.done : animations.loading }
            />
            <Text style={style.label}>Downloading the internet x)</Text>
        </View>
    )
}