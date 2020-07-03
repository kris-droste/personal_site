import {
  GET_MESSAGES,
  MESSAGE_ERROR,
  DELETE_MESSAGE,
  ADD_MESSAGE,
  GET_MESSAGE
} from '../actions/types';

const initialState = {
  messages: [],
  message: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: payload,
        loading: false
      };
    case GET_MESSAGE:
      return {
        ...state,
        message: payload,
        loading: false
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [payload, ...state.messages],
        loading: false
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(message => message._id !== payload),
        loading: false
      };
    case MESSAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
