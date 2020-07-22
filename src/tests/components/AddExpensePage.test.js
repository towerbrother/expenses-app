import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { AddExpensePage } from "./../../components/AddExpensePage";
import expensesTestData from "../fixtures/expenses";
import ExpenseForm from "../../components/ExpenseForm";

Enzyme.configure({ adapter: new Adapter() });

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
