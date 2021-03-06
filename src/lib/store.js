import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import checklist from '../ducks/checklist.js';
import formData from '../ducks/formData.js';

import logger from '../middleware/logger.js';

const appReducer = combineReducers({
  checklist,
  formData,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(appReducer, composeEnhancers(applyMiddleware(thunk, logger,)));

