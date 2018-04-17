import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const initialState = {
  form: []
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Combine Reducers
const reducers = combineReducers({
  formReducer
});

export default reducers;
