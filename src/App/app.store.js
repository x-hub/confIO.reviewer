import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './app.reducers';
import promise from 'redux-promise';

export default createStore(
    combineReducers(reducers),
    applyMiddleware(promise)
)
