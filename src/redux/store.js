import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import tablesReducer from "./tablesRedux";
import { thunk } from "redux-thunk";
import { initialState } from "./initialState";

const subReducers = {
  tables: tablesReducer,
};

const reducer = combineReducers(subReducers);

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f,
  ),
);

export default store;
