import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_WORKS,
  WORK_ERROR,
  UPDATE_WORK,
  DELETE_WORK,
  ADD_WORK,
  GET_WORK,
} from './types';

// Get Works
export const getWorks = () => async dispatch => {
  try {
    const res = await api.get('/works');

    dispatch({
      type: GET_WORKS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: WORK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Work
export const deleteWork = id => async dispatch => {
  try {
    await api.delete(`/works/${id}`);
    dispatch({
      type: DELETE_WORK,
      payload: id
    });

    dispatch(setAlert('Work Removed', 'success'));
  } catch (err) {
    dispatch({
      type: WORK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update Work
export const updateWork = (id, formData) => async dispatch => {
  try {
    const res = await api.put(`/works/${id}`, { data: formData });
    dispatch({
      type: UPDATE_WORK,
      payload: res.data
    });

    dispatch(setAlert('Work Updated', 'success'));
  } catch (err) {
    dispatch({
      type: WORK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Work
export const addWork = formData => async dispatch => {
  try {
    const res = await api.post('/works', formData);
    dispatch({
      type: ADD_WORK,
      payload: res.data
    });

    dispatch(setAlert('Work Created', 'success'));
  } catch (err) {
    dispatch({
      type: WORK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Work
export const getWork = id => async dispatch => {
  try {
    const res = await api.get(`/works/${id}`);

    dispatch({
      type: GET_WORK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: WORK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
