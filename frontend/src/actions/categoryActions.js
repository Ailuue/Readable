import * as types from "./actionTypes";
import axios from "axios";

export const setCategories = categories => {
  return {
    type: types.SET_CATEGORIES,
    categories: categories
  };
};

export const fetchCategories = () => {
  return dispatch => {
    axios
      .get("http://localhost:3001/categories", {
        headers: { Authorization: "whatever-you-want" }
      })
      .then(res => {
        dispatch(setCategories(res.data));
      });
  };
};
