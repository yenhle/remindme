import { combineReducers } from "redux";
import listReducer from "./listReducer";
import remindersReducer from "./remindersReducer";


export const rootReducer = combineReducers({
  reminders: remindersReducer,
  lists: listReducer
})

export type rootState = ReturnType<typeof rootReducer>