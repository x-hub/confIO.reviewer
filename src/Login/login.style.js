import {colors} from 'shared/theme';

const logoSize = 120;

export default {
    loginContainer: {
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.3)',
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
    confDetailsContainer: {
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
    eventLogo: {
        height: 150,
        resizeMode: 'contain',
    },
    selectEventBtn: {
        backgroundColor: colors.primary,
        alignSelf: 'center',
    },
    selectEvent: {
        fontSize: 18,
        padding: 15,
        color: colors.black,
    },
    icon: {
        color: colors.black,
    },
    backgroundImage: {
        position: 'absolute',
    },
}
