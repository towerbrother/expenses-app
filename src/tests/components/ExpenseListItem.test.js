import React from "react";
import { shallow } from "enzyme";
import expensesTestData from "../fixtures/expenses";
import ExpenseListItem from "./../../components/ExpenseListItem";

test("should render ExpenseListItem correctly", () => {
  const wrapper = shallow(<ExpenseListItem {...expensesTestData[0]} />);
  expect(wrapper).toMatchSnapshot();
});
