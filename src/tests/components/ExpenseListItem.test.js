import React from "react";
import { shallow } from "enzyme";
import expensesTestData from "../fixtures/expenses";
import ExpenseListItem from "./../../components/ExpenseListItem";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

test("should render ExpenseListItem correctly", () => {
  const wrapper = shallow(<ExpenseListItem {...expensesTestData[0]} />);
  expect(wrapper).toMatchSnapshot();
});
