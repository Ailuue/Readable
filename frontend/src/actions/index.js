import axios from 'axios';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const FETCH_POSTS = 'FETCH_POSTS';
export const SET_POSTS = 'SET_POSTS';
export const SET_COMMENTS = 'SET_COMMENTS';

export const setCategories = categories => {
  return {
    type: SET_CATEGORIES,
    categories: categories
  };
};

export const fetchCategories = () => {
  return dispatch => {
    axios
      .get('http://localhost:3001/categories', {
        headers: { Authorization: 'whatever-you-want' }
      })
      .then(res => {
        dispatch(setCategories(res.data));
      });
  };
};

export const setPosts = posts => {
  return {
    type: SET_POSTS,
    posts: posts
  };
};

export const fetchPosts = () => {
  return dispatch => {
    axios
      .get('http://localhost:3001/posts', {
        headers: { Authorization: 'whatever-you-want' }
      })
      .then(res => {
        dispatch(setPosts(res.data));
      });
  };
};
