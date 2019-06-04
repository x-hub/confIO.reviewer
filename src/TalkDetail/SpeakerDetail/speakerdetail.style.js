import {colors} from "shared/theme"

export default {
    Label: {fontFamily: "Roboto-Medium", color: "white", fontSize: 20},
    //slideUp
    slideUp: {
        position: "relative", justifyContent: "flex-end",
        alignItems: "center", backgroundColor: colors.white
    },
    slideUpHeader: { padding: 10, backgroundColor: colors.primary, width: "100%"},
    slideUpUser: {
        marginTop: -40, width: "100%", flexDirection: "row",
        justifyContent: "center", alignItems: "center"
    },
    slideUpUserImg: {
        borderWidth: 2, borderColor: "white",
        width: 70, height: 70, borderRadius: 35
    },
    slideUpBody: {
        position: "relative", marginTop: 5,
        paddingHorizontal: 10, zIndex: -1, width: "100%"
    },
    slideUpBio:{fontWeight: "400", color: "black", marginTop: 10, fontFamily: "Roboto-Light"}
}