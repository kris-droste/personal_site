import {
  GET_PARAGRAPHS,
  PARAGRAPH_ERROR,
  UPDATE_PARAGRAPH,
  DELETE_PARAGRAPH,
  ADD_PARAGRAPH,
  GET_PARAGRAPH
} from '../actions/types';

const initialState = {
  paragraphs: [],
  paragraph: '',
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PARAGRAPHS:
      return {
        ...state,
        paragraphs: payload,
        loading: false
      };
    case GET_PARAGRAPH:
      return {
        ...state,
        paragraph: payload,
        loading: false
      };
    case ADD_PARAGRAPH:
      return {
        ...state,
        paragraphs: [payload, ...state.paragraphs],
        loading: false
      };
    case DELETE_PARAGRAPH:
      return {
        ...state,
        paragraphs: state.paragraphs.filter(paragraph => paragraph._id !== payload),
        loading: false
      };
    case PARAGRAPH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_PARAGRAPH:
      return {
        ...state,
        paragraphs: [payload, ...state.paragraphs.filter(paragraph => paragraph._id !== payload.id)],
      };
    default:
      return state;
  }
}
