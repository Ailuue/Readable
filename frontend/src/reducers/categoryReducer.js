import { SET_CATEGORIES } from '../actions/index';

const initialState = {
  categories: null
};

const setCategories = (state, action) => {
  return action.categories;
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return setCategories(state, action);
    default:
      return state;
  }
};

export default categoryReducer;
