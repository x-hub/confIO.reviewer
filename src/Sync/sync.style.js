import Color from 'color';
import { colors } from 'shared/theme';


export default {
	header: {
		justifyContent: 'flex-start',
        alignItems: 'center',
	},
    sceneTitle: {
        textAlign: 'center',
        fontSize: 18,
        color: colors.black,
    },
    goBackIcon: {
        color: colors.black,
    },
    animationBackgroundColor: new Color(colors.primary).lighten(0.3).hex(),
    actionContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.white,
        paddingBottom: 21,
        paddingRight: 8,
        paddingLeft: 8,
    },
    actionText: {
        fontSize: 13,
    },
    actionVoteTarget: {
        fontWeight: 'bold',
        color: new Color(colors.primary).darken(0.4).hex(),
    },
    actionVoteResult: {
        fontWeight: 'bold',
        color: new Color(colors.primary).darken(0.4).hex(),
    },
    actionTextContainer: {
        flex: 8,
    },
    actionRemoveContainer: {
        flex: 2,
    },
    emptyActionsListText: {
        marginTop: 34,
        fontSize: 21,
        fontWeight: 'bold',
        color: colors.black,
        textAlign: 'center',
    },
    syncSuccessText: {
        marginTop: 34,
        fontSize: 21,
        color: colors.primary,
        textAlign: 'center',
    },
    emptyActionAnimation: {
        alignSelf: 'center',
        height: 200,
        width: 200,
    },
    doneAnimation: {
        alignSelf: 'center',
        height: 200,
        width: 200,
    },
}
