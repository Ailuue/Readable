import axios from 'axios';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const FETCH_POSTS = 'FETCH_POSTS';
export const SET_POSTS = 'SET_POSTS';
export const SET_COMMENTS = 'SET_COMMENTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_POST = 'EDIT_POST';

export const addPost = post => {
  return {
    type: ADD_POST,
    post: post
  };
};

export const editPost = (post, id) => {
  console.log(post.id);
  return dispatch => {
    axios
      .put(`http://localhost:3001/posts/${id}`, post, {
        headers: { Authorization: 'whatever-you-want' }
      })
      .then(res => {
        dispatch(addPost(res.data));
      });
  };
};

export const uploadPost = post => {
  return dispatch => {
    axios
      .post('http://localhost:3001/posts', post, {
        headers: { Authorization: 'whatever-you-want' }
      })
      .then(dispatch(addPost(post)))
      .catch(err => console.log);
  };
};

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

export const fetchOnePost = id => {
  return dispatch => {
    axios
      .get(`http://localhost:3001/posts/${id}`, {
        headers: { Authorization: 'whatever-you-want' }
      })
      .then(res => {
        dispatch(setPosts(res.data));
      });
  };
};

export const setComments = comments => {
  return {
    type: SET_COMMENTS,
    comments: comments
  };
};

export const fetchComments = id => {
  return dispatch => {
    axios
      .get(`http://localhost:3001/posts/${id}/comments`, {
        headers: { Authorization: 'whatever-you-want' }
      })
      .then(res => {
        dispatch(setComments(res.data));
      });
  };
};

export const deletePost = (id, callback) => {
  axios
    .delete(`http://localhost:3001/posts/${id}`, {
      headers: { Authorization: 'whatever-you-want' }
    })
    .then(() => callback());

  return {
    type: DELETE_POST
  };
};

export const deleteComplete = id => {
  console.log(id);
  return {
    type: DELETE_COMMENT,
    id: id
  };
};

export const deleteComment = id => {
  axios
    .delete(`http://localhost:3001/comments/${id}`, {
      headers: { Authorization: 'whatever-you-want' }
    })
    .then(res => deleteComplete(res.data));
};
