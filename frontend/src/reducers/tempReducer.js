import { TEMP_ACTION } from '../actions';

const tempReducer = (state = { temp: 'temp' }, action) => {
  switch (action.type) {
    case TEMP_ACTION:
      return { ...state };
    default:
      return state;
  }
};

export default tempReducer;
