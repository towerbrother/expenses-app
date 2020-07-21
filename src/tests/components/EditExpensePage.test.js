import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import ExpenseForm from "../../components/ExpenseForm";
import expensesTestData from "../fixtures/expenses";

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpense}
      removeExpense={removeExpense}
      history={history}
      expense={expensesTestData[0]}
    />
  );
});

test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle editExpense", () => {
  wrapper.find(ExpenseForm).prop("onSubmit")(expensesTestData[0]);
  expect(editExpense).toHaveBeenLastCalledWith(
    expensesTestData[0].id,
    expensesTestData[0]
  );
  expect(history.push).toHaveBeenLastCalledWith("/");
});

test("should handle removeExpense", () => {
  wrapper.find("button").simulate("click");
  expect(removeExpense).toHaveBeenLastCalledWith({
    id: expensesTestData[0].id,
  });
  expect(history.push).toHaveBeenLastCalledWith("/");
});
