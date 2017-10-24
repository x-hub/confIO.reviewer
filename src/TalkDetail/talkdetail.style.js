import {colors} from "shared/theme"

export default {
    Header: {backgroundColor: colors.primary, justifyContent: "center", alignItems: "center"},
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: '#EAF0F2',
        alignItems: "center"

    },
    Label: {fontFamily: "Roboto-Medium", color: "white", fontSize: 20},
    speakers: {
        marginTop: 10,
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        position: "relative"
    },

    speakerBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: -10
    },
    speakerImg: {
        borderRadius: 35,
        height: 70,
        width: 70,
        borderColor: colors.white,
        borderWidth: 2
    },
    speakerImgMarginLeft: {
        marginLeft: -20,
    },
    //Content
    content: {flex: 1, backgroundColor: colors.gris, padding: 2},
    contentTypes: {marginTop: 10, width: "89%", flexDirection: "row"},
    contentTypesItem: {
        justifyContent: "center", padding: 10,
        flex: 1, alignItems: "center"
    },
    contentTypesItemLabel: {color: "white", fontFamily: "Roboto-Light"},
    contentBody: {flex: 1, width: "90%", zIndex: 0},


}
