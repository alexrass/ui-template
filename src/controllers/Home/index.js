import classNames from 'classnames';
import CSSModules from 'react-css-modules';
import React from 'react';

import styles from './styles';

@CSSModules(styles)
class Home extends React.Component {

  render() {
    return (
      <div styleName='container'>
        Hello, world!
      </div>
    );
  }
}

export default Home;
