import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    routing: routerReducer,
    userReducer,
  });

export default rootReducer;
