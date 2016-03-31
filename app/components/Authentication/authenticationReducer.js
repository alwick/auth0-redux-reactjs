import {combineReducers} from 'redux';

import {LOGIN,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT_SUCCESS,INITIALIZE} from './authenticationActions';

function profile(state = null, action = null) {
    switch(action.type) {
        case LOGIN:
            return null;
        case LOGIN_SUCCESS:
            return action.profile;
        case LOGOUT_SUCCESS:
            return null;
        default:
            return state;
    }
}

const authentication = combineReducers({
    profile
});
export default authentication;
