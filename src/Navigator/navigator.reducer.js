import { Navigator } from 'app/Navigator';
import actions from 'app/Navigator/navigator.actions';

function getStateForRoute(route) {
    return Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams(route))
}

const INITIAL_STATE = getStateForRoute('Login');

export default (state = INITIAL_STATE, action) => {
    let nextState = null;
    if(action.type.startsWith('GOTO_')) {
        const route = action.type.match(/GOTO_(.*)/)[1];
        nextState = getStateForRoute(route);
        action = { type: 'Navigation/NAVIGATE', routeName: route };   
    }
    nextState = Navigator.router.getStateForAction(action, state);
    return nextState || state;

};

