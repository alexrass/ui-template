import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import CSSModules from 'react-css-modules';

import NotFoundImagePath from './404.png';
import styles from './styles';

@CSSModules(styles)
class NotFound extends React.Component {
  static propTypes = {
    router: PropTypes.object,
  }

  render() {
    return (
      <div styleName='container'>
        <div styleName='info'>
          404: Page not found<br />
        </div>
        <img styleName='image' src={ NotFoundImagePath } />
      </div>
    );
  }
}

export default withRouter(NotFound);
