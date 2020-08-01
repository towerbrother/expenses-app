import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoadingPage from "./../../components/LoadingPage";

Enzyme.configure({ adapter: new Adapter() });

test("should render LoadingPage correctly", () => {
  const wrapper = shallow(<LoadingPage />);
  expect(wrapper).toMatchSnapshot();
});
