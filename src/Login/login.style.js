import { colors } from 'shared/theme';

const logoSize = 233;

export default {
    loginContainer: {
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    logoContainer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoWrapper: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        width: logoSize,
        height: logoSize,
        justifyContent: 'center',
    },
    eventDetailsContainer: {
        justifyContent: 'center',
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center',
    },
    eventInfos: {
        flex: 1,
        padding: 15,
        alignSelf: 'stretch',
        flexDirection: 'column',
    },
    eventType: {
        color: colors.white,
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    eventName: {
        alignSelf: 'center',
        color: colors.blue,
        fontSize: 24,
        fontWeight: 'bold',
    },
    eventImageContainer: {
        marginTop: 8,
        marginBottom: 8,
        padding: 3,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255,0.8)',
    },
    eventImage: {
        height: 150,
        resizeMode: 'contain',
    },
    selectEventBtn: {
        padding: 15,
        backgroundColor: colors.primary,
        alignSelf: 'center',
    },
    selectEvent: {
        fontSize: 18,
        color: colors.black,
    },
    icon: {
        fontSize: 18,
        color: colors.black,
    },
    backgroundImage: {
        position: 'absolute',
    },
}
