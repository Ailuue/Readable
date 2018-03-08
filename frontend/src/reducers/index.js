import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import postsReducer from './postsReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  categoryReducer,
  postsReducer,
  form: formReducer
});

export default rootReducer;
