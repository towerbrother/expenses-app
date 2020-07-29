import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { LoginPage } from "./../../components/LoginPage";

Enzyme.configure({ adapter: new Adapter() });

test("should render LoginPage correctly", () => {
  const wrapper = shallow(<LoginPage startLogin={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test("should startLogin on button click", () => {
  const startLogin = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLogin} />);
  wrapper.find("button").simulate("click");
  expect(startLogin).toHaveBeenCalled();
});
