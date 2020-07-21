import {
  addExpense,
  editExpense,
  removeExpense,
} from "./../../actions/expenses";

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "testId" });
  expect(action).toEqual({ type: "REMOVE_EXPENSE", id: "testId" });
});

test("should setup edit expense action object", () => {
  const action = editExpense("testId", { note: "test note" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "testId",
    updates: { note: "test note" },
  });
});

test("should setup add expense action object with provided values", () => {
  const expenseData = {
    description: "test description",
    note: "test note",
    amount: 1234,
    createdAt: 1234,
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenseData,
      id: expect.any(String),
    },
  });
});

test("should setup add expense action object with default values", () => {
  const expenseData = {};
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
      id: expect.any(String),
    },
  });
});
