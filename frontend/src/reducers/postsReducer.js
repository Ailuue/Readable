import { SET_POSTS, ADD_POST, DELETE_POST, POST_VOTE } from '../actions/index';

const initialState = {
  posts: null
};

const setPosts = (state, action) => {
  if (state.posts == null) {
    return action;
  } else {
    return { ...state, action };
  }
};

const addPost = (state, action) => {
  if (state.posts == null) {
    return action;
  } else {
    return { ...state, action };
  }
};

const updatePosts = (state, action) => {
  if (state.posts.length > 1) {
    const newState = state.posts.map(post => {
      console.log(post);
      console.log(action);
      if (post.id == action.post.id) {
        return action.post;
      } else {
        return post;
      }
    });
    return newState;
  } else {
    return action.post;
  }
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
      // console.log(state);
      // console.log(action);
      return updatePosts(state, action);
    default:
      return state;
  }
};

export default postsReducer;
