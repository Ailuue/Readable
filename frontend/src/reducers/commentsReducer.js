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

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return setComments(state, action);
    case ADD_COMMENT:
      return addComment(state, action);
    case DELETE_COMMENT:
      return state;
    default:
      return state;
  }
};

export default commentsReducer;
