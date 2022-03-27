import { Dispatch } from "redux";
import {
  addListToLocalStorage,
  deleteListFromLocalStorage,
  editListFromLocalStorage,
} from "../../utils/api";
import { IList } from "../reducers/listReducer";

export const ADD_LIST = "ADD_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const EDIT_LIST = "EDIT_LIST";
export const GET_FIRST_LIST = "GET_FIRST_LIST";

interface addListAction {
  type: typeof ADD_LIST;
  list: IList;
}

interface deleteListAction {
  type: typeof DELETE_LIST;
  list: IList;
}

interface editListAction {
  type: typeof EDIT_LIST;
  newList: string;
  oldList: string;
}

const addListAction = (nameOfList: string): ListActionTypes => {
  return {
    type: ADD_LIST,
    list: { name: nameOfList },
  };
};

const deleteListAction = (list: IList): ListActionTypes => {
  return {
    type: DELETE_LIST,
    list,
  };
};

const editListAction = (newList: string, oldList: string): ListActionTypes => {
  return {
    type: EDIT_LIST,
    newList,
    oldList,
  };
};

export const handleAddList = (nameOfList: string) => {
  return (dispatch: Dispatch<ListActionTypes>) => {
    dispatch(addListAction(nameOfList));
    addListToLocalStorage(nameOfList);
  };
};

export const handleDeleteList = (list: IList) => {
  return (dispatch: Dispatch<ListActionTypes>) => {
    dispatch(deleteListAction(list));
    deleteListFromLocalStorage(list);
  };
};

export const handleEditList = (newList: string, oldList: string) => {
  return (dispatch: Dispatch<ListActionTypes>) => {
    dispatch(editListAction(newList, oldList));
    editListFromLocalStorage(newList, oldList);
  };
};

export type ListActionTypes = addListAction | deleteListAction | editListAction;