import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import message from './message';
import poem from './poem';

export default combineReducers({
  alert,
  auth,
  profile,
  message,
  poem
});
