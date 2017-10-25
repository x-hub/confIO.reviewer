import React, { Component } from 'react';
import {View,Text} from "react-native"
import { Container, Header, Content, Spinner ,Button} from 'native-base';
import {colors} from "shared/theme"
export default (props) => {
    return (
        <Container>

            <Header backgroundColor={colors.primary} />
            <Content>

                <Spinner color={colors.primary} />
                <Button onPress={()=> props.navigation.navigate('Detail')}><Text>To Detail</Text></Button>
             
            </Content>
        </Container>
);
}
