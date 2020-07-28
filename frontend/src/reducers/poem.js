import {
  GET_POEMS,
  POEM_ERROR,
  UPDATE_LIKES,
  DELETE_POEM,
  ADD_POEM,
  GET_POEM,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';

const initialState = {
  poems: [],
  poem: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POEMS:
      return {
        ...state,
        poems: payload,
        loading: false
      };
    case GET_POEM:
      return {
        ...state,
        poem: payload,
        loading: false
      };
    case ADD_POEM:
      return {
        ...state,
        poems: [payload, ...state.poems],
        loading: false
      };
    case DELETE_POEM:
      return {
        ...state,
        poems: state.poems.filter(poem => poem._id !== payload),
        loading: false
      };
    case POEM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        poems: state.poems.map(poem =>
          poem._id === payload.id ? { ...poem, likes: payload.likes } : poem
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        poem: { ...state.poem, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        poem: {
          ...state.poem,
          comments: state.poem.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}
