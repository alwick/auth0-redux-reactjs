import React from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import Authentication from '../Authentication/Authentication';

/**
 * Import locally scoped styles using css-loader
 * See style.sass in this directory.
 *
 * More info: https://github.com/webpack/css-loader#local-scope
 */
import styles from './style';

/**
 * Reference an image and get back a URL automatically via webpack.
 * webpack takes care of versioning, bundling for production, etc.
*/
import logoURL from './images/wickidcool-web-small.png';

export default class Header extends React.Component {
  render() {
    const {actions,auth} = this.props;

    return (
        <div className={styles.main}>
        <Grid>
          <Row>
            <Col xs={4} md={6}>
              <img className={styles.logo} src={logoURL} />
            </Col>

            <Col xs={8} md={6}>
              <div>
                <h1>Test</h1>
              </div>
              <div className={styles.links}>
                <Authentication actions={actions} auth={auth}/>
              </div>
            </Col>
          </Row>
        </Grid>
        </div>
    );
  }
}
