import { combineReducers } from 'redux';
import listReducer from './listReducer';

export default combineReducers({
    list: listReducer
});