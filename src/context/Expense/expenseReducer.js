import {
  ADD_EXPENSE,
  EDIT_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  COMPUTE_TOTAL_EXPENSE,
  CLEAR_ALL_EXPENSE,
  SET_HOME_STATE,
  FETCH_DATA_FROM_LOCAL_STORAGE,
  REMOVE_TOAST_MODE,
} from '../types';

export default (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_EXPENSE:
      if (localStorage.getItem('expenses') !== null) {
        const list = JSON.parse(localStorage.getItem('expenses'));
        list.push(payload);
        localStorage.setItem('expenses', JSON.stringify(list));
        return { ...state, expenses: list };
      } else {
        const list = [payload];
        console.log(list);
        localStorage.setItem('expenses', JSON.stringify(list));
        return { ...state, expenses: list };
      }

    case EDIT_EXPENSE:
      let findExpense = state.expenses.filter(
        (expense) => expense.id === payload
      );

      return {
        ...state,
        currentExpense: findExpense[0],
        mode: 'edit',
      };

    case UPDATE_EXPENSE:
      state.currentExpense.name = payload.name;
      state.currentExpense.cost = payload.cost;

      const updateList = JSON.parse(localStorage.getItem('expenses'));

      updateList.forEach((expense, index) => {
        if (expense.id === state.currentExpense.id)
          updateList.splice(index, 1, state.currentExpense);
      });

      localStorage.setItem('expenses', JSON.stringify(updateList));

      return {
        ...state,
        expenses: updateList,
        currentExpense: null,
        mode: 'add',
        toastMode: 'edit',
      };

    case DELETE_EXPENSE:
      const list = JSON.parse(localStorage.getItem('expenses'));

      list.forEach((expense, index) => {
        if (expense.id === payload) list.splice(index, 1);
      });

      localStorage.setItem('expenses', JSON.stringify(list));

      return { ...state, expenses: list };

    case COMPUTE_TOTAL_EXPENSE:
      let total = 0;
      if (state.expenses.length > 0)
        total = state.expenses.reduce((acc, expense) => acc + expense.cost, 0);
      return { ...state, totalExpense: total };

    case CLEAR_ALL_EXPENSE:
      if (localStorage.getItem('expenses') !== null)
        localStorage.removeItem('expenses');
      return {
        expenses: [],
        totalExpense: 0,
        currentExpense: null,
        mode: 'add',
        toastMode: null,
      };

    case SET_HOME_STATE:
      return { ...state, mode: 'add', currentExpense: null };

    case FETCH_DATA_FROM_LOCAL_STORAGE:
      if (localStorage.getItem('expenses') !== null) {
        const list = JSON.parse(localStorage.getItem('expenses'));
        return {
          ...state,
          expenses: list,
        };
      } else {
        return { ...state, expenses: [] };
      }

    case REMOVE_TOAST_MODE:
      return { ...state, toastMode: null };
    default:
      return state;
  }
};
