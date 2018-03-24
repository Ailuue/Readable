import * as types from "./actionTypes";
import axios from "axios";

export const addComment = comment => {
  return {
    type: types.ADD_COMMENT,
    comment: comment
  };
};

export const uploadComment = (comment, callback) => {
  return dispatch => {
    axios
      .post("http://localhost:3001/comments", comment, {
        headers: { Authorization: "whatever-you-want" }
      })
      .then(dispatch(addComment(comment)))
      .catch(err => console.log)
      .then(() => callback());
  };
};

export const editComment = (comment, id, callback) => {
  return dispatch => {
    axios
      .put(`http://localhost:3001/comments/${id}`, comment, {
        headers: { Authorization: "whatever-you-want" }
      })
      .then(res => {
        dispatch(addComment(res.data));
      })
      .then(() => callback());
  };
};

export const fetchComments = id => {
  return dispatch => {
    axios
      .get(`http://localhost:3001/posts/${id}/comments`, {
        headers: { Authorization: "whatever-you-want" }
      })
      .then(res => {
        dispatch(setComments(res.data));
      });
  };
};

export const deleteComment = (id, callback) => {
  axios
    .delete(`http://localhost:3001/comments/${id}`, {
      headers: { Authorization: "whatever-you-want" }
    })
    .then(() => callback());

  return {
    type: types.DELETE_COMMENT,
    id: id
  };
};

export const commentVote = (id, vote) => {
  return dispatch => {
    axios
      .post(
        `http://localhost:3001/comments/${id}`,
        { option: vote },
        {
          headers: { Authorization: "whatever-you-want" }
        }
      )
      .then(res => {
        dispatch({
          type: types.COMMENT_VOTE,
          comment: res.data
        });
      })
      .catch(err => console.log);
  };
};

export const setComments = comments => {
  return {
    type: types.SET_COMMENTS,
    comments: comments
  };
};
