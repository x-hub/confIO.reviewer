import React from "react"
import {Image, Text, TouchableHighlight, View} from "react-native"

export default (styles, props) => {
    let speakersView = [];
    props.speakers.forEach((speaker, i) => {
        speakersView.push(<View key={i}>
            <TouchableHighlight style={{...styles.speakerImg, zIndex: i * -1, marginLeft: (i != 0 ? -10 : 0)}}
                                onPress={props.getSpeaker.bind(this, i)}>
                <Image
                    style={{height: 66, width: 66, borderRadius: 33}}
                    source={{uri: speaker.avatarURL}}
                />
            </TouchableHighlight>
        </View>)

    })
    if (props.speakers.length == 1) {
        speakersView.push(<View key={props.speakers.length + 1}>
            <Text style={{
                marginLeft: 10,
                fontSize: 30,
                fontWeight: "100",
                fontFamily: "Roboto-Light"
            }}>{props.speakers[0].firstName} {props.speakers[0].lastName}</Text>
        </View>)
    }
    return speakersView;
}