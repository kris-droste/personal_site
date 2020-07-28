import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import paragraph from './paragraph';
import work from './work';
import user from './user';
import message from './message';


export default combineReducers({
  alert,
  auth,
  paragraph,
  work,
  user,
  message
});
