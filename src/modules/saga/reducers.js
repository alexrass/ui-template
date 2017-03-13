import authReducer from './auth/reducers';
import routingReducer from './routing/reducers';
import { Identifier as AuthIdentifier } from './auth/constants';
import { Identifier as RoutingIdentifier } from './routing/constants';

export default {
  [ AuthIdentifier ]: authReducer,
  [ RoutingIdentifier ]: routingReducer,
};
