import {Dimensions} from 'react-native';
import {colors} from "shared/theme"

const {width, height} = Dimensions.get("window");
const background = require("assets/Homebg.png");
export default {
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        width,
        height,
    },
    wrapper: {
        paddingVertical: 30,
    },
    center: {
        alignItems: "center",
        justifyContent: "center"
    },
    labelM: {fontFamily: "Roboto-Medium", fontSize: 20, color: colors.white},
    labelL: {fontFamily: "Roboto-Light", fontSize: 20, color: colors.white},
    avatar: {
        borderRadius: 60, borderWidth: 3,
        borderColor: colors.white, height: 120, width: 120
    },
    card: {
        alignSelf: "stretch", marginHorizontal: 20,
        borderRadius: 8,
        paddingVertical: 20,
        flex: 1,
        marginTop: 10,
        flexDirection: "row",
    }

};
