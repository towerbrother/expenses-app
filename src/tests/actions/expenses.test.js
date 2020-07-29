import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addExpense,
  startAddExpense,
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses,
} from "./../../actions/expenses";
import expensesTestData from "../fixtures/expenses";
import { database } from "../../firebase/firebase";

beforeEach((done) => {
  const expenses = {};
  expensesTestData.forEach(({ id, description, note, amount, createdAt }) => {
    expenses[id] = { description, note, amount, createdAt };
  });
  database
    .ref("expenses")
    .set(expenses)
    .then(() => done());
});

const mockStore = configureStore([thunk]);

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "testId" });
  expect(action).toEqual({ type: "REMOVE_EXPENSE", id: "testId" });
});

test("should remove expense from firebase", (done) => {
  const store = mockStore({});
  const id = expensesTestData[2].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "REMOVE_EXPENSE",
      id,
    });
    database
      .ref(`expenses/${id}`)
      .once("value")
      .then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
      });
  });
});

test("should setup edit expense action object", () => {
  const action = editExpense("testId", { note: "test note" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "testId",
    updates: { note: "test note" },
  });
});

test("should edit expense in firebase", (done) => {
  const store = mockStore({});
  const id = expensesTestData[2].id;
  const updates = { note: "updated note" };
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "EDIT_EXPENSE",
      id,
      updates,
    });
    return database
      .ref(`expenses/${id}`)
      .once("value")
      .then((snapshot) => {
        expect(snapshot.val().note).toBe(updates.note);
        done();
      });
  });
});

test("should setup add expense action object with provided values", () => {
  const action = addExpense(expensesTestData[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expensesTestData[2],
  });
});

test("should add expense to database and store", (done) => {
  const store = mockStore({});
  const expenseData = {
    description: "Mouse",
    note: "",
    amount: 1950,
    createdAt: 1000,
  };
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: { id: expect.any(String), ...expenseData },
    });
    database
      .ref(`expenses/${actions[0].expense.id}`)
      .once("value")
      .then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
      });
  });
});

test("should add expense with defaults data to database and store", (done) => {
  const store = mockStore({});
  const expenseDefaultData = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0,
  };
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: { id: expect.any(String), ...expenseDefaultData },
    });
    database
      .ref(`expenses/${actions[0].expense.id}`)
      .once("value")
      .then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaultData);
        done();
      });
  });
});

test("should setup set expenses action object", () => {
  const action = setExpenses(expensesTestData);
  expect(action).toEqual({ type: "SET_EXPENSES", expenses: expensesTestData });
});

test("should fetch expenses from firebase", (done) => {
  const store = mockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses: expensesTestData,
    });
    done();
  });
});
