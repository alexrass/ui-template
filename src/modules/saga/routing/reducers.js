import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = Immutable.Map({
  locationBeforeTransitions: null,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload
      });
    default:
      return state;
  }
}
