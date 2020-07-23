import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ExpensesSummary } from "./../../components/ExpensesSummary";

Enzyme.configure({ adapter: new Adapter() });

test("should render ExpensesSummary correctly with multiple expenses", () => {
  const wrapper = shallow(
    <ExpensesSummary expensesCount={3} expensesTotal={34698} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpensesSummary correctly with one expense", () => {
  const wrapper = shallow(
    <ExpensesSummary expensesCount={1} expensesTotal={34} />
  );
  expect(wrapper).toMatchSnapshot();
});
