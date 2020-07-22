import React from "react";
import { shallow } from "enzyme";
import { ExpenseList } from "./../../components/ExpenseList";
import expensesTestData from "../fixtures/expenses";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

test("should render ExpenseList with expenses", () => {
  const wrapper = shallow(<ExpenseList expenses={expensesTestData} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseList with empty message", () => {
  const wrapper = shallow(<ExpenseList expenses={[]} />);
  expect(wrapper).toMatchSnapshot();
});
