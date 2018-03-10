import { SET_COMMENTS, DELETE_COMMENT } from '../actions';
import _ from 'lodash';

const initialState = {
  comments: null
};

const setComments = (state, action) => {
  return action;
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return setComments(state, action);
    case DELETE_COMMENT:
      return state.filter(comment => comment.id !== action.id);
    default:
      return state;
  }
};

export default commentsReducer;
