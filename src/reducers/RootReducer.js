import { combineReducers } from 'redux';
import userReducer from './UserReducer';

const mainReducer = combineReducers({
    user: userReducer,
});

export const baseURL = 'http://127.0.0.1:8000/';

export default mainReducer;
