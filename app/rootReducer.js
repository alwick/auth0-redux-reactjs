import {combineReducers} from 'redux';
import application from './components/Application/applicationReducer';
import authentication from './components/Authentication/authenticationReducer';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    application, authentication,
    routing: routerReducer
});
export default rootReducer;