import Auth0 from 'auth0-js';

export const LOGIN = "authentication.LOGIN";
export const LOGIN_SUCCESS = "authentication.LOGIN_SUCCESS";
export const LOGIN_FAIL = "authentication.LOGIN_FAIL";
export const LOGOUT_SUCCESS = "authentication.LOGOUT_SUCCESS";
export const INITIALIZE = "authentication.INITIALIZE";

var auth0;

function initializeIdToken() {
    var idToken = localStorage.getItem('userToken');
    var authHash = auth0.parseHash(window.location.hash);
    if (!idToken && authHash) {
        if (authHash.id_token) {
            idToken = authHash.id_token;
            localStorage.setItem('userToken', authHash.id_token);
        }
        if (authHash.error) {
            console.log("Error signing in", authHash);
            return null;
        }
    }
    return idToken;
}

export function initialize(parms) {
    auth0 = new Auth0({
        domain: parms.domain,
        clientID: parms.clientID,
        callbackURL: parms.callbackURL,
        callbackOnLocationHash: true
    });

    return (dispatch) => {
        var idToken = initializeIdToken();

        if( idToken !== null ) {
            auth0.getProfile(idToken, function (err, profile) {
                if (err) {
                    console.log("Error loading the Profile", err);
                    return;
                }

                dispatch(loginSuccess( profile ));
            });
        }
    }
}

export function onLogin() {
    return (dispatch) => {
        // global variable in the tmpl.html file
        auth0.loginWithPopup({
                popup: true,
                connection: 'Username-Password-Authentication',
                popupOptions: {
                    width: 400,
                    height: 500
                }
            },
            function(err, profile, id_token, access_token, state) {
                if (err) {
                    dispatch(loginFail( err, state ));
                    return;
                }

                localStorage.setItem('userToken', id_token);

                dispatch(loginSuccess( profile ));
            });
    };
}

function login() {
    return {
        type: LOGIN
    };
}

function loginSuccess(profile, id_token, access_token, state) {
    return {
        type: LOGIN_SUCCESS,
        profile: profile
    };
}

function loginFail(reason, result) {
    return {
        type: LOGIN_FAIL,
        reason: reason,
        error: result
    };
}

export function onLogout() {
    return (dispatch) => {
        dispatch( {
            type: LOGOUT_SUCCESS
        })

        auth0.logout({returnTo: 'http://localhost:8080/'});
        localStorage.removeItem('userToken');
    }
}