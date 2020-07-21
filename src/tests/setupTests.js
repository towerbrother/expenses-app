import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

// You need to configure enzyme to use the adapter you want it to use.
// To do this, you can use the top level configure(...) API.
