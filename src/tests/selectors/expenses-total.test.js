import getExpenseTotal from "../../selectors/expenses-total";
import expensesTestData from "../fixtures/expenses";

test("should return 0 if no expense is passed", () => {
  const result = getExpenseTotal();
  expect(result).toBe(0);
});

test("should correctly add up if one expense is passed", () => {
  const result = getExpenseTotal([expensesTestData[0]]);
  expect(result).toBe(195);
});

test("should correctly add up if multiple expenses are passed", () => {
  const result = getExpenseTotal(expensesTestData);
  expect(result).toBe(114195);
});
