// IMPORTANT: This needs to be first (before any other components)
// to get around CSS order randomness in webpack.
import './css/base';

// Some ES6+ features require the babel polyfill
// More info here: https://babeljs.io/docs/usage/polyfill/
// Uncomment the following line to enable the polyfill
// require("babel/polyfill");
import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/Application/Application';
import {Provider} from 'react-redux';
import configureStore from './rootStore';
var store = configureStore();
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import {initialize} from './components/Authentication/authenticationActions';
import {AUTH0_CLIENT_ID,AUTH0_CALLBACK_URL,AUTH0_DOMAIN} from './auth0-variables';

export default class Index extends React.Component {
    componentDidMount() {
        const parms = {
            clientID: AUTH0_CLIENT_ID,
            domain: AUTH0_DOMAIN,
            callbackURL: AUTH0_CALLBACK_URL
        };

        store.dispatch( initialize( parms ) );
    }

    render() {
        return <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={Application} />
            </Router>
        </Provider>;
    }
}

ReactDOM.render( <Index/>, document.getElementById('app'));

