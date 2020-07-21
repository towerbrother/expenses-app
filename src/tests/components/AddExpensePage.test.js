import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "./../../components/AddExpensePage";
import expensesTestData from "../fixtures/expenses";
import ExpenseForm from "../../components/ExpenseForm";

let addExpense, history, wrapper;

beforeEach(() => {
  addExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <AddExpensePage addExpense={addExpense} history={history} />
  );
});

test("should render AddExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle addExpense", () => {
  wrapper.find(ExpenseForm).prop("onSubmit")(expensesTestData[0]);
  expect(addExpense).toHaveBeenLastCalledWith(expensesTestData[0]);
  expect(history.push).toHaveBeenLastCalledWith("/");
});
