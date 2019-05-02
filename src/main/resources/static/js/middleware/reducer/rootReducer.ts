import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import userReducer from './userReducer';
import { reducer as reduxFormReducer } from 'redux-form';

const rootReducer = combineReducers({
    routing: routerReducer,
    userReducer,
    form: reduxFormReducer,
  });

export default rootReducer;
