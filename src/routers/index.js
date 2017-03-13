import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import App from 'controllers/App';
import Home from 'controllers/Home';
import NotFound from 'controllers/NotFound';

class Main extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  }

  render() {
    const { history, store } = this.props;

    return (
      <Provider store={ store }>
        <Router key={ new Date().toISOString() } history={ history }>
          <Route component={ App } path='/'>
            <IndexRoute components={{ main: Home }} />
            <Route path='*' components={{ main: NotFound }} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

const mapStateToProps = () => {
  return createStructuredSelector({
    someStateToPropAttr: () => {}
  });
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    someDispatchRequest: () => {}
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

