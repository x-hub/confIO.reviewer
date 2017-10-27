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
}
