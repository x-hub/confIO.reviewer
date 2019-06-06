import { createStore, combineReducers, applyMiddleware ,compose} from 'redux';
import * as reducers from './app.reducers';
import promise from 'redux-promise';
import { composeWithDevTools } from 'remote-redux-devtools';

function reactNavigationPayloadFlatmap({ getState }) {
    const navigationActionType = 'Navigation/NAVIGATE'
    return next => action => {
        let resultAction = Object.assign({}, action)
        if(action.type === navigationActionType && !action.routeName) {
            resultAction = {
                ...action.payload,
                type: navigationActionType,
            }
        } 
        return next(resultAction)
    }
}
const composeEnhancers = composeWithDevTools({realtime: true, port: 9090 });
export default createStore(
    combineReducers(reducers),
    composeEnhancers(applyMiddleware(
        promise,
        reactNavigationPayloadFlatmap,
    ))
)
