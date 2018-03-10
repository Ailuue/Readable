import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import postsReducer from './postsReducer';
import commentsReducer from './commentsReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  categoryReducer,
  postsReducer,
  commentsReducer,
  form: formReducer
});

export default rootReducer;
