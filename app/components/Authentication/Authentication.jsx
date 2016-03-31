import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';

/**
 * Import locally scoped styles using css-loader
 * See style.sass in this directory.
 *
 * More info: https://github.com/webpack/css-loader#local-scope
 */
//import styles from './style';

export default class Authentication extends React.Component {
    render() {
        const {actions,auth} = this.props;

        return (
            <div className="authenticationLinks">
                <div style={{float:'right'}}>
                    { auth.profile === null ?
                        <a onClick={actions.onLogin}>Sign In/Sign Up</a>
                        :
                        <a onClick={actions.onLogout}>Log Out</a>
                    }
                </div>
                {auth.profile !== null ?
                    <p> Welcome { auth.profile.name }</p>
                    : null
                }
            </div>

        );
  }
}