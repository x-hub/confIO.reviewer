import React, {Component} from 'react';
import {Dimensions, Image, Text, View,TouchableOpacity} from 'react-native';
import {
    Badge,
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Header,
    Icon,
    Left,
    Right,
    Thumbnail,
} from "native-base"
import styles from "app/Home/home.style"
import {colors} from "shared/theme"
export function TouchableCTA(props) {
    const { backgroundColor, list, event, onPress, name } = props;
    const CTAContainer = list.length? EnabledCTA : DisabledCTA;
    return (
        <CTAContainer>
            <View style={{...styles.center, flex: 1, flexDirection: "row"}}>
                <Text style={{...styles.labelL, fontSize: 33, color: colors.black}}>{list.length}</Text>
                <Text style={{fontFamily: "Roboto-Light", fontSize: 22, marginLeft: 10}}>{ name }</Text>
            </View>
            <View style={{marginHorizontal: 10, justifyContent: 'center'}}>
                {list.length ?  <View style={{alignSelf: 'stretch'}}>
                    <Icon style={{color: colors.black}} name="md-arrow-dropright"/>
                </View> :<View/>}
            </View>
        </CTAContainer>
    );

    function EnabledCTA(props) {
        return (
            <TouchableOpacity
                onPress={()=>{onPress(event, list)}}
                style={{ ...styles.card, backgroundColor }}
            >
                { props.children }
            </TouchableOpacity>
        );
    }

    function DisabledCTA(props) {
        return (
            <View style={{ ...styles.card, backgroundColor }}>
                { props.children }
            </View>
        );
    }
}