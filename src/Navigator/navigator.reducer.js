import { Navigator } from 'app/Navigator';
import actions from 'app/Navigator/navigator.actions';

function getStateForRoute(route) {
    return Navigator.router.getStateForAction(Navigator.router.getActionForPathAndParams(route))
}

const INITIAL_STATE = getStateForRoute('Login');

export default (state = INITIAL_STATE, action) => {
    let nextState = null;
    nextState = Navigator.router.getStateForAction(action, state);
    if(nextState.routes[nextState.index].routeName == "Feed" && state.routes[state.index].routeName == "Home" )
        return state
    return nextState || state;
};

