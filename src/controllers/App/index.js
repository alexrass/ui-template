import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles';

@CSSModules(styles)
class App extends React.Component {
  static propTypes = {
    main: PropTypes.node,
  }

  render() {
    const { main } = this.props;
    return (
      <div styleName={'container'}>
        { main }
      </div>
    );
  }
}

export default App;
