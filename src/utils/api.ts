import {
    listState,
    initialListState,
    IList,
  } from "../store/reducers/listReducer";
  import {
    initialRemindersState,
    IReminder,
    remindersState,
  } from "../store/reducers/remindersReducer";
  
  const REMINDERS_STORAGE_KEY = "REMINDERS_STORAGE_KEY";
  const LISTS_STORAGE_KEY = "LISTS_STORAGE_KEY";
  
  // ====================== LIST ======================
  
  export const getListsFromLocalStorage = (): listState => {
    checkListsLocalStorage();
    // setLocalStorageList(initialListState)
    return getLocalStorageList();
  };
  
  export const addListToLocalStorage = (nameOfList: string): void => {
    const lists = {
      lists: [...getLocalStorageList().lists, { name: nameOfList }],
    };
    setLocalStorageList(lists);
  };
  
  export const deleteListFromLocalStorage = (list: IList): void => {
    const lists = {
      lists: getLocalStorageList().lists.filter((l) => l.name !== list.name),
    };
    setLocalStorageList(lists);
  };
  
  export const editListFromLocalStorage = (
    newList: string,
    oldList: string
  ): void => {
    const lists = {
      lists: getLocalStorageList().lists.map((l) => {
        if (l.name === oldList) {
          l.name = newList;
        }
        return l;
      }),
    };
    setLocalStorageList(lists);
  };
  
  const checkListsLocalStorage = (): void => {
    if (localStorage.getItem(LISTS_STORAGE_KEY) === null) {
      setLocalStorageList(initialListState);
    }
  };
  
  const setLocalStorageList = (items: listState): void => {
    localStorage.setItem(LISTS_STORAGE_KEY, JSON.stringify(items));
  };
  
  const getLocalStorageList = (): listState => {
    return JSON.parse(localStorage.getItem(LISTS_STORAGE_KEY) || "{}");
  };
  
  // ====================== REMINDER ======================
  
  export const getRemindersFromLocalStorage = (): remindersState => {
    checkRemindersLocalStorage();
    // setLocalStorageReminder(initialRemindersState)
    return getLocalStorageReminder();
  };
  
  export const addReminderToLocalStorage = (
    reminder: string,
    forList: string
  ): void => {
    const reminders = {
      reminders: [
        ...getLocalStorageReminder().reminders,
        {
          reminder,
          completed: false,
          for: forList,
        },
      ],
    };
  
    setLocalStorageReminder(reminders);
  };
  
  export const setReminderToLocalStorage = (
    reminder: IReminder,
    list: string
  ): void => {
    const reminders = {
      reminders: getLocalStorageReminder().reminders.map((r) => {
        if (r.reminder === reminder.reminder && r.for === list) {
          return {
            ...r,
            completed: !r.completed,
          };
        }
        return r;
      }),
    };
    setLocalStorageReminder(reminders);
  };
  
  export const deleteReminderFromLocalStorage = (reminder: IReminder): void => {
    const reminders = {
      reminders: getLocalStorageReminder().reminders.filter(
        (r) =>
          r.reminder !== reminder.reminder ||
          r.for !== reminder.for ||
          r.completed !== reminder.completed
      ),
    };
    setLocalStorageReminder(reminders);
  };
  
  export const deleteRemindersFromListFromLocalStorage = (list: string): void => {
    const reminders = {
      reminders: getLocalStorageReminder().reminders.filter(
        (r) => r.for !== list
      ),
    };
    setLocalStorageReminder(reminders);
  };
  
  export const deleteCompletedRemindersFromListFromLocalStorage = (
    list: string
  ): void => {
    const reminders = {
      reminders: getLocalStorageReminder().reminders.filter((r) => {
        if (r.for === list && r.completed === true) {
          return false;
        }
        return true;
      }),
    };
    setLocalStorageReminder(reminders);
  };
  
  export const editReminderForLocalStorage = (
    newReminder: string,
    oldReminder: string,
    list: string
  ): void => {
    const reminders = {
      reminders: getLocalStorageReminder().reminders.map((r) => {
        if (r.reminder === oldReminder && r.for === list) {
          r.reminder = newReminder;
        }
        return r;
      }),
    };
    setLocalStorageReminder(reminders);
  };
  
  export const editListForRemindersForLocalStorage = (
    newList: string,
    oldList: string
  ): void => {
    const reminders = {
      reminders: getLocalStorageReminder().reminders.map((r) => {
        if (r.for === oldList) {
          r.for = newList;
        }
        return r;
      }),
    };
    setLocalStorageReminder(reminders);
  };
  
  const checkRemindersLocalStorage = (): void => {
    if (localStorage.getItem(REMINDERS_STORAGE_KEY) === null) {
      setLocalStorageReminder(initialRemindersState);
    }
  };
  
  const setLocalStorageReminder = (reminders: remindersState): void => {
    localStorage.setItem(REMINDERS_STORAGE_KEY, JSON.stringify(reminders));
  };
  
  const getLocalStorageReminder = (): remindersState => {
    return JSON.parse(localStorage.getItem(REMINDERS_STORAGE_KEY) || "{}");
  };
  
  // ====================== OTHER ======================
  
  export {}; // to avoid TS error