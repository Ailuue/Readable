import { combineReducers } from 'redux';
import tempReducer from './tempReducer';

const rootReducer = combineReducers({ tempReducer });

export default rootReducer;
