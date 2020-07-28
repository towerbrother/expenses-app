import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import ExpenseForm from "../../components/ExpenseForm";
import expensesTestData from "../fixtures/expenses";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expensesTestData[0]}
    />
  );
});

test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle startEditExpense", () => {
  wrapper.find(ExpenseForm).prop("onSubmit")(expensesTestData[0]);
  expect(startEditExpense).toHaveBeenLastCalledWith(
    expensesTestData[0].id,
    expensesTestData[0]
  );
  expect(history.push).toHaveBeenLastCalledWith("/");
});

test("should handle startRemoveExpense", () => {
  wrapper.find("button").simulate("click");
  expect(startRemoveExpense).toHaveBeenLastCalledWith({
    id: expensesTestData[0].id,
  });
  expect(history.push).toHaveBeenLastCalledWith("/");
});
