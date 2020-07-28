import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_PARAGRAPHS,
  PARAGRAPH_ERROR,
  UPDATE_PARAGRAPH,
  DELETE_PARAGRAPH,
  ADD_PARAGRAPH,
  GET_PARAGRAPH,
} from './types';

// Get Paragraphs
export const getParagraphs = () => async dispatch => {
  try {
    const res = await api.get('/paragraphs');

    dispatch({
      type: GET_PARAGRAPHS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PARAGRAPH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Paragraph
export const deleteParagraph = id => async dispatch => {
  try {
    await api.delete(`/paragraphs/${id}`);
    dispatch({
      type: DELETE_PARAGRAPH,
      payload: id
    });

    dispatch(setAlert('Paragraph Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PARAGRAPH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update Paragraph
export const updateParagraph = (id, formData) => async dispatch => {
  try {
    const res = await api.put(`/paragraphs/${id}`, { data: formData });
    dispatch({
      type: UPDATE_PARAGRAPH,
      payload: res.data
    });

    dispatch(setAlert('Paragraph Updated', 'success'));
  } catch (err) {
    dispatch({
      type: PARAGRAPH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Paragraph
export const addParagraph = formData => async dispatch => {
  try {
    const res = await api.post('/paragraphs', formData);
    dispatch({
      type: ADD_PARAGRAPH,
      payload: res.data
    });

    dispatch(setAlert('Paragraph Created', 'success'));
  } catch (err) {
    dispatch({
      type: PARAGRAPH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Paragraph
export const getParagraph = id => async dispatch => {
  try {
    const res = await api.get(`/paragraphs/${id}`);

    dispatch({
      type: GET_PARAGRAPH,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PARAGRAPH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
