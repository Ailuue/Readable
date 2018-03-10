import { SET_COMMENTS } from '../actions';

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
    default:
      return state;
  }
};

export default commentsReducer;
