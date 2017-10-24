import { colors } from 'shared/theme';

export default {
    modal: {
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 0.5,
        flexDirection: 'column',
        paddingTop: 34,
        paddingBottom: 34,
        paddingLeft: 7,
        paddingRight: 7,
        backgroundColor: colors.white,
	},
    eventName: {
        color: colors.black,
        fontWeight: 'bold',
    },
    eventImage: {
        width: null,
        height: 144,
        resizeMode: 'contain',
    },
    eventDescription: {
        marginTop: 55,
        fontSize: 13,
        textAlign: 'justify',
    },
}
