import authReducer from "./../../reducers/auth";

test("should set uid for login correctly", () => {
  const action = {
    type: "LOGIN",
    uid: "authId",
  };
  const state = authReducer({}, action);
  expect(state.uid).toBe(action.uid);
});

test("should remove uid for logout correctly", () => {
  const action = {
    type: "LOGOUT",
  };
  const state = authReducer({ uid: "authId" }, action);
  expect(state).toEqual({});
});
