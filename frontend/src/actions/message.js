import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_MESSAGES,
  MESSAGE_ERROR,
  DELETE_MESSAGE,
  ADD_MESSAGE,
  GET_MESSAGE
} from './types';


// Get messages
export const getMessages = () => async dispatch => {
  try {
    const res = await api.get('/messages');

    dispatch({
      type: GET_MESSAGES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete message
export const deleteMessage = id => async dispatch => {
  try {
    await api.delete(`/messages/${id}`);

    dispatch({
      type: DELETE_MESSAGE,
      payload: id
    });

    dispatch(setAlert('Message Removed', 'success'));
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add message
export const addMessage = formData => async dispatch => {
  try {
    const res = await api.post('/messages', formData);

    dispatch({
      type: ADD_MESSAGE,
      payload: res.data
    });

    dispatch(setAlert('Message Created', 'success'));
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get message
export const getMessage = id => async dispatch => {
  try {
    const res = await api.get(`/messages/${id}`);

    dispatch({
      type: GET_MESSAGE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
