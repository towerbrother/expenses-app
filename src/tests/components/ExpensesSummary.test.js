import React from "react";
import { ExpensesSummary } from "./../../components/ExpensesSummary";
import expensesTestData from "../fixtures/expenses";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

test("should render ExpensesSummary correctly with multiple expenses", () => {
  const wrapper = shallow(<ExpensesSummary expenses={expensesTestData} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpensesSummary correctly with one expense", () => {
  const wrapper = shallow(<ExpensesSummary expenses={expensesTestData[0]} />);
  expect(wrapper).toMatchSnapshot();
});
