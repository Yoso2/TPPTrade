import { combineReducers } from 'redux';

//Import all app reducers here
import appReducer from './components/App/duck/index';

//Combine all reducers here, then export to index.js
const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
