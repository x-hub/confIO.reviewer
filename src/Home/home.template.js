import React, { Component } from "react"
import { Dimensions, Image, Text, View } from "react-native"
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
import nativeStorage from "app/App/Services/nativeStorage"
import styles from "./home.style"
import { colors } from "shared/theme"
import _ from 'lodash'
const { width, height } = Dimensions.get("window")
import { TouchableCTA } from "./TouchableCTA/index"
const devoxxian = require('assets/devoxxian.png')

export default props => {
  const { navigate, goBack } = props.navigation
  const pictureurl = _.get(props, "user.pictureurl")
  const firstName = _.get(props, "user.firstName")
  const lastName = _.get(props, "user.lastName")
  const company = _.get(props, "user.company")
  return (
    <View style={styles.container}>
      <Image
        source={require("assets/Homebg.png")}
        style={styles.background}
        resizeMode="cover"
      />
      <Container>
        <Header
          style={{ opacity: 0 }}
          noShadow={true}
          backgroundColor="rgba(0,0,0,0.01)"
        >
          <Body>
            <Text style={styles.labelM}>{props.event.name}</Text>
          </Body>
          <Right>
            <Icon
              onPress={() => goBack()}
              style={{ color: colors.white }}
              name="md-log-out"
            />
          </Right>
        </Header>
        <Content style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", ...styles.center }}>
              <Thumbnail
                style={styles.avatar}
                source={pictureurl? { uri: pictureurl } : devoxxian}
              />
              <View style={{ marginLeft: 16, alignItems: "center" }}>
                <Text style={{ ...styles.labelL, fontSize: 18 }}>
                  {firstName}
                  {lastName}
                </Text>
                <Text style={{ marginTop: 5, color: colors.gris }}>
                  @{company}
                </Text>
              </View>
            </View>
            <TouchableCTA
              name="To Review"
              onPress={props.toNotReviewedTalks}
              backgroundColor="#78C4E8"
              event={props.event}
              list={props.talks}
            />
            <TouchableCTA
              name="Reviewed"
              onPress={props.toReviewedTalks}
              backgroundColor="#e8a652"
              event={props.event}
              list={props.reviewed}
            />
            <TouchableCTA
              name="To Review Later"
              onPress={props.toReviewedLaterTalks}
              backgroundColor="#E36B86"
              event={props.event}
              list={props.later}
            />
            <View style={{ ...styles.card }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Button
                  iconLeft
                  transparent
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    padding: 15,
                    borderColor: colors.white,
                    justifyContent: "center",
                  }}
                  onPress={props.fetchActionsAndNavigateToSync.bind(
                    this,
                    props.event
                  )}
                >
                  <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <Icon
                      style={{
                        color: colors.white,
                      }}
                      name="swap"
                    />
                    <Text
                      style={{
                        color: colors.white,
                        marginLeft: 7,
                      }}
                    >
                      Sync With conf.io
                    </Text>
                  </View>
                </Button>
              </View>
            </View>
            <View style={{ ...styles.card, marginTop: 10 }} />
          </View>
        </Content>
      </Container>
    </View>
  )
}
