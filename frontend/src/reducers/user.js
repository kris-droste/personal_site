import {
  GET_USERS,
  USER_ERROR,
  UPDATE_USER,
  DELETE_USER,
  ADD_USER,
  GET_USER
} from '../actions/types';

const initialState = {
  users: [],
  user: '',
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case ADD_USER:
      return {
        ...state,
        users: [payload, ...state.users],
        loading: false
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== payload),
        loading: false
      };
    case USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_USER:
      return {
        ...state,
        users: [payload, ...state.users.filter(user => user._id !== payload.id)],
      };
    default:
      return state;
  }
}
