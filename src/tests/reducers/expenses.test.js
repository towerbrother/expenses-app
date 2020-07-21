import expensesReducer from "./../../reducers/expenses";
import moment from "moment";
import expensesTestData from "../fixtures/expenses";

test("should set default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should add expense to state", () => {
  const action = {
    type: "ADD_EXPENSE",
    expense: {
      id: "4",
      description: "Travel",
      note: "",
      amount: 450000,
      createdAt: moment(0).add(6, "days").valueOf(),
    },
  };
  const state = expensesReducer(expensesTestData, action);
  expect(state).toEqual([...expensesTestData, action.expense]);
});

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expensesTestData[1].id,
  };
  const state = expensesReducer(expensesTestData, action);
  expect(state).toEqual([expensesTestData[0], expensesTestData[2]]);
});

test("should not remove expense if id not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1",
  };
  const state = expensesReducer(expensesTestData, action);
  expect(state).toEqual([
    expensesTestData[0],
    expensesTestData[1],
    expensesTestData[2],
  ]);
});

test("should edit expense", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: expensesTestData[1].id,
    updates: { note: "Updated note" },
  };
  const state = expensesReducer(expensesTestData, action);
  expect(state[1].note).toBe(action.updates.note);
});

test("should not edit expense if id not found", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: "-1",
    note: "Updated note",
  };
  const state = expensesReducer(expensesTestData, action);
  expect(state).toEqual([...expensesTestData]);
});
