import {colors} from "shared/theme"

export default {
    Label: {fontFamily: "Roboto-Medium", color: "white", fontSize: 20},
    //slideUp
    slideUp: {
        position: "relative", flex: 1, justifyContent: "flex-end",
        alignItems: "center", backgroundColor: colors.white
    },
    slideUpHeader: {flex: 1, padding: 10, backgroundColor: colors.primary, width: "100%"},
    slideUpUser: {
        marginTop: -55, width: "100%", flexDirection: "row",
        justifyContent: "center", alignItems: "center"
    },
    slideUpUserImg: {
        borderWidth: 2, borderColor: "white",
        width: 100, height: 100, borderRadius: 50
    },
    slideUpBody: {
        position: "relative", marginTop: 5,
        paddingLeft: 10, flex: 2, zIndex: -1,
        backgroundColor: colors.white, width: "100%"
    }
}