import { FETCH_CATEGORIES, SET_CATEGORIES } from '../actions/index';
import updateObject from '../utils/updateObject';

const initialState = {
  categories: null
};

const setCategories = (state, action) => {
  return action.categories;
};

const tempReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return setCategories(state, action);
    default:
      return state;
  }
};

export default tempReducer;
