import {colors} from "shared/theme"

export default {
	header: {
		justifyContent: 'flex-start',
	},
    sceneTitle: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        color: colors.black,
    },
    goBackIcon: {
        color: colors.black,
    },
    reviewLaterIcon: {
        color: colors.black,
    },
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: '#EAF0F2',
        alignItems: "center"

    },
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
