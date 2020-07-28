import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { AddExpensePage } from "./../../components/AddExpensePage";
import expensesTestData from "../fixtures/expenses";
import ExpenseForm from "../../components/ExpenseForm";

Enzyme.configure({ adapter: new Adapter() });

let startAddExpense, history, wrapper;

beforeEach(() => {
  startAddExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <AddExpensePage startAddExpense={startAddExpense} history={history} />
  );
});

test("should render AddExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit", () => {
  wrapper.find(ExpenseForm).prop("onSubmit")(expensesTestData[0]);
  expect(startAddExpense).toHaveBeenLastCalledWith(expensesTestData[0]);
  expect(history.push).toHaveBeenLastCalledWith("/");
});
