import * as types from "./actionTypes";
import axios from "axios";

export const addPost = post => {
  return {
    type: types.ADD_POST,
    post: post
  };
};

export const editPost = (post, id) => {
  return dispatch => {
    axios
      .put(`http://localhost:3001/posts/${id}`, post, {
        headers: { Authorization: "whatever-you-want" }
      })
      .then(res => {
        dispatch(addPost(res.data));
      });
  };
};

export const uploadPost = post => {
  return dispatch => {
    axios
      .post("http://localhost:3001/posts", post, {
        headers: { Authorization: "whatever-you-want" }
      })
      .then(dispatch(addPost(post)))
      .catch(err => console.log);
  };
};

export const setPosts = posts => {
  return {
    type: types.SET_POSTS,
    posts: posts
  };
};

export const fetchPosts = () => {
  return dispatch => {
    axios
      .get("http://localhost:3001/posts", {
        headers: { Authorization: "whatever-you-want" }
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
        headers: { Authorization: "whatever-you-want" }
      })
      .then(res => {
        dispatch(setPosts(res.data));
      });
  };
};

export const deletePost = (id, callback) => {
  axios
    .delete(`http://localhost:3001/posts/${id}`, {
      headers: { Authorization: "whatever-you-want" }
    })
    .then(() => callback());

  return {
    type: types.DELETE_POST
  };
};

export const postVote = (id, vote) => {
  return dispatch => {
    axios
      .post(
        `http://localhost:3001/posts/${id}`,
        { option: vote },
        {
          headers: { Authorization: "whatever-you-want" }
        }
      )
      .then(res => {
        dispatch({
          type: types.POST_VOTE,
          post: res.data
        });
      })
      .catch(err => console.log);
  };
};
