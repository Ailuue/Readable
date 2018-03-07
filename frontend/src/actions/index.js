import axios from 'axios';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const SET_CATEGORIES = 'SET_CATAGORIES';

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
