import { createStore, combineReducers } from 'redux';
import * as reducers from './app.reducers';

export default createStore(
    combineReducers(reducers)
)
