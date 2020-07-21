import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// ADD_EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createAt,
  },
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

// EDIT_EXPENSE
const editExpense = (id, update) => ({
  type: "EDIT_EXPENSE",
  id,
  update,
});

// SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});

// SORT_BY_DATE
const sortByDate = () => ({ type: "SORT_BY_DATE" });

// SORT_BY_AMOUNT
const sortByAmount = () => ({ type: "SORT_BY_AMOUNT" });

// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
  type: "SET_START_DATE",
  startDate,
});

// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
  type: "SET_END_DATE",
  endDate,
});

// Expense reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          return { ...expense, ...action.update };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

// Filters reducer
const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return { ...state, text: action.text };
    case "SORT_BY_DATE":
      return { ...state, sortBy: "date" };
    case "SORT_BY_AMOUNT":
      return { ...state, sortBy: "amount" };
    case "SET_START_DATE":
      return { ...state, startDate: action.startDate };
    case "SET_END_DATE":
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createAt < b.createAt ? 1 : -1;
      } else {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

// created the store combining reducers
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  })
);

// to watch dispatches
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

// actions dispatches
const expenseOne = store.dispatch(
  addExpense({ description: "Rent January", amount: 1250, createAt: -2000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "Coffee Gail's", amount: 350, createAt: 2000 })
);
const expenseThree = store.dispatch(
  addExpense({
    description: "Grocery Sainsbury's",
    amount: 895620,
    createAt: 6000,
  })
);
const expenseFour = store.dispatch(
  addExpense({
    description: "New bike",
    amount: 1000,
    createAt: 78000,
  })
);
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));
// store.dispatch(setTextFilter(""));
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(-1999));
// store.dispatch(setEndDate(1999));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate());

// Dummy state
// const demoState = {
//   expenses: [
//     {
//       id: "dhfhsdf",
//       description: "rent",
//       note: "final payment",
//       amount: 54300,
//       createAt: 0,
//     },
//   ],
//   filters: {
//     text: "rent",
//     sortBy: "date", // date or amount
//     startDate: undefined,
//     endDate: undefined,
//   },
// };
