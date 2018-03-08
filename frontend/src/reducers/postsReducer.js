import { SET_POSTS } from '../actions/index';

const initialState = {
  posts: null
};

const setPosts = (state, action) => {
  return action;
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return setPosts(state, action);
    default:
      return state;
  }
};

export default postsReducer;
