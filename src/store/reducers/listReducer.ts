import { getListsFromLocalStorage } from "../../utils/api";
import {
  ADD_LIST,
  DELETE_LIST,
  EDIT_LIST,
  ListActionTypes,
} from "../actions/listActions";

export interface IList {
  name: string;
  // dateCreated: number
  // dateModified: number
}

export interface listState {
  lists: IList[];
}

export const initialListState = {
  lists: [
    {
      name: "Welcome!",
    },
  ],
};

export default function listReducer(
  state: listState = getListsFromLocalStorage(),
  action: ListActionTypes
): listState {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.list],
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((l) => l.name !== action.list.name),
      };
    case EDIT_LIST:
      return {
        ...state,
        lists: state.lists.map((l) => {
          if (l.name === action.oldList) {
            l.name = action.newList;
          }
          return l;
        }),
      };
    default:
      return state;
  }
}