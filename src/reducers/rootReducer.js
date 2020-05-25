import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import authReducer from './authReducer';
import menuReducer from './menuReducer';

const rootReducer = combineReducers({
  mapReducer: mapReducer,
  authReducer: authReducer,
  menuReducer: menuReducer
});

export default rootReducer;