import {
  GET_WORKS,
  WORK_ERROR,
  UPDATE_WORK,
  DELETE_WORK,
  ADD_WORK,
  GET_WORK
} from '../actions/types';

const initialState = {
  works: [],
  work: '',
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WORKS:
      return {
        ...state,
        works: payload,
        loading: false
      };
    case GET_WORK:
      return {
        ...state,
        work: payload,
        loading: false
      };
    case ADD_WORK:
      return {
        ...state,
        works: [payload, ...state.works],
        loading: false
      };
    case DELETE_WORK:
      return {
        ...state,
        works: state.works.filter(work => work._id !== payload),
        loading: false
      };
    case WORK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_WORK:
      return {
        ...state,
        works: [payload, ...state.works.filter(work => work._id !== payload.id)],
      };
    default:
      return state;
  }
}
