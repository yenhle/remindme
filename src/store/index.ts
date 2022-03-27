import { applyMiddleware, createStore } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { ReminderActionTypes } from "./actions/remindersActions";
import { rootState, rootReducer } from "./reducers";

// export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<rootState, ReminderActionTypes>)
);