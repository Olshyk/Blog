import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { articlesReducer } from './reducers/articlesReducer';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
  articles: articlesReducer,
  user: userReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
