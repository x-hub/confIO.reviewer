import {colors} from "shared/theme"

export default {
    headerTitle: {fontFamily: "Roboto-Medium", color: "white", fontSize: 20},
    title: {flex: 1, fontFamily: "Roboto-Light"},
    rateLater: {flex: 0, marginLeft: 6},
    body: {
        justifyContent: "center",
        alignItems: "center", flexDirection: "column",
        backgroundColor: colors.primary, height: 250
    },
    trackImg: {height: 80, width: 80},
    trackLabel: {fontSize: 20, color: colors.white, fontFamily: "Roboto-Light"},
    talkLabel: {fontFamily: "Roboto-Light"}
}