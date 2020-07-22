import React from "react";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expensesTestData from "../fixtures/expenses";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

test("should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm correctly with expense data", () => {
  const wrapper = shallow(<ExpenseForm expense={expensesTestData[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {},
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(0)
    .simulate("change", { target: { value: "New description" } });
  expect(wrapper.state("description")).toBe("New description");
});

test("should set note on input change", () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("textarea")
    .simulate("change", { target: { value: "New note" } });
  expect(wrapper.state("note")).toBe("New note");
});

test("should set amount if valid input", () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", { target: { value: "22.50" } });
  expect(wrapper.state("amount")).toBe("22.50");
});

test("should not set amount if invalid input", () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", { target: { value: "13.678" } });
  expect(wrapper.state("amount")).toBe("");
});

test("should call onSubmit prop for valid form submission", () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expensesTestData[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {},
  });
  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expensesTestData[0].description,
    amount: expensesTestData[0].amount,
    note: expensesTestData[0].note,
    createdAt: expensesTestData[0].createdAt,
  });
});

test("should set new date on date change", () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});

test("should set calendarFocused on date change", () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop("onFocusChange")(focused);
  expect(wrapper.state("calendarFocused")).toBe(focused);
});
