import Color from 'color';
import { colors } from 'shared/theme';


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
    animationBackgroundColor: new Color(colors.primary).lighten(0.3).hex(),
    actionContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.white,
        paddingTop: 21,
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
    emptyActionAnimation: {
        alignSelf: 'center',
        height: 200,
        width: 200,
    },
}
