import { SET_POSTS, ADD_POST, DELETE_POST, POST_VOTE } from '../actions/index';

const initialState = {
  posts: null
};

const setPosts = (state, action) => {
  return action;
};

const addPost = (state, action) => {
  return {
    ...state,
    action
  };
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return setPosts(state, action);
    case ADD_POST:
      return addPost(state, action);
    case DELETE_POST:
      return state;
    case POST_VOTE:
      console.log('hello');
      console.log(action);
      return { ...state };
    default:
      return state;
  }
};

export default postsReducer;
