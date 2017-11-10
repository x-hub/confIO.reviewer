import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './app.reducers';
import promise from 'redux-promise';

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

export default createStore(
    combineReducers(reducers),
    applyMiddleware(
        promise,
        reactNavigationPayloadFlatmap,
    )
)
