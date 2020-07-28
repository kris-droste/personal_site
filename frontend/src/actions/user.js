import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_USERS,
  USER_ERROR,
  UPDATE_USER,
  DELETE_USER,
  ADD_USER,
  GET_USER,
} from './types';

// Get Users
export const getUsers = () => async dispatch => {
  try {
    const res = await api.get('/users');

    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete User
export const deleteUser = id => async dispatch => {
  try {
    await api.delete(`/users/${id}`);
    dispatch({
      type: DELETE_USER,
      payload: id
    });

    dispatch(setAlert('User Removed', 'success'));
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update User
export const updateUser = (id, formData) => async dispatch => {
  try {
    const res = await api.put(`/users/${id}`, formData);
    dispatch({
      type: UPDATE_USER,
      payload: res.data
    });

    dispatch(setAlert('User Updated', 'success'));
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add User
export const addUser = formData => async dispatch => {
  try {
    const res = await api.post('/users', formData);
    dispatch({
      type: ADD_USER,
      payload: res.data
    });

    dispatch(setAlert('User Created', 'success'));
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get User
export const getUser = id => async dispatch => {
  try {
    const res = await api.get(`/users/${id}`);

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
