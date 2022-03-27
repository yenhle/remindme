import { getRemindersFromLocalStorage } from "../../utils/api";
import {
  ADD_REMINDER,
  DELETE_COMPLETED_REMINDERS_FROM_LIST,
  DELETE_REMINDER,
  DELETE_REMINDERS_FROM_LIST,
  EDIT_LIST_FOR_REMINDERS,
  EDIT_REMINDER,
  ReminderActionTypes,
  SET_REMINDER,
} from "../actions/remindersActions";

export interface IReminder {
  reminder: string;
  // dateCreated: number
  // dateModified: number
  completed: boolean;
  for: string;
}

export interface remindersState {
  reminders: IReminder[];
}

export const initialRemindersState = {
  reminders: [
    {
      reminder: "Hello World!",
      completed: false,
      for: "Welcome!",
    },
    {
      reminder: "Double click me to edit",
      completed: false,
      for: "Welcome!",
    },
  ],
};

export default function remindersReducer(
  state: remindersState = getRemindersFromLocalStorage(),
  action: ReminderActionTypes
): remindersState {
  switch (action.type) {
    case ADD_REMINDER:
      return {
        ...state,
        reminders: [...state.reminders, action.reminder],
      };
    case SET_REMINDER:
      return {
        ...state,
        reminders: state.reminders.map((r) => {
          if (
            r.reminder === action.reminder.reminder &&
            r.for === action.list
          ) {
            return {
              ...r,
              completed: !r.completed,
            };
          }
          return r;
        }),
      };
    case DELETE_REMINDER:
      return {
        ...state,
        reminders: state.reminders.filter((r) => r !== action.reminder),
      };
    case DELETE_REMINDERS_FROM_LIST:
      return {
        ...state,
        reminders: state.reminders.filter((r) => r.for !== action.list),
      };
    case DELETE_COMPLETED_REMINDERS_FROM_LIST:
      return {
        ...state,
        reminders: state.reminders.filter((r) => {
          if (r.for === action.list && r.completed === true) {
            return false;
          }
          return true;
        }),
      };
    case EDIT_REMINDER:
      return {
        ...state,
        reminders: state.reminders.map((r) => {
          if (r.reminder === action.oldReminder && r.for === action.list) {
            r.reminder = action.newReminder;
          }
          return r;
        }),
      };
    case EDIT_LIST_FOR_REMINDERS:
      return {
        ...state,
        reminders: state.reminders.map((r) => {
          if (r.for === action.oldList) {
            r.for = action.newList;
          }
          return r;
        }),
      };
    default:
      return state;
  }
}