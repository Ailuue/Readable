import { SET_POSTS, ADD_POST } from '../actions/index';

const initialState = {
  posts: null
};

const setPosts = (state, action) => {
  return action;
};

const addPost = (state, action) => {
  return ({
    ...state,
    action
  });
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return setPosts(state, action);
    case ADD_POST:
      return addPost(state, action);
    default:
      return state;
  }
};

export default postsReducer;
