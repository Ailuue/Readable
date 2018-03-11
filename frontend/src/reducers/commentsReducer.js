import { SET_COMMENTS, DELETE_COMMENT, ADD_COMMENT } from '../actions';
import _ from 'lodash';

const initialState = {
  comments: null
};

const setComments = (state, action) => {
  return action;
};

const addComment = (state, action) => {
  return {
    ...state,
    action
  };
};

const deleteComment = (state, action) => {
  if (state.comments.length > 1) {
    const newState = state.comments.filter(comment => {
      return comment.id != action.id;
    });
    return { comments: newState };
  } else {
    return { comments: {} };
  }
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return setComments(state, action);
    case ADD_COMMENT:
      return addComment(state, action);
    case DELETE_COMMENT:
      return deleteComment(state, action);
    default:
      return state;
  }
};

export default commentsReducer;
