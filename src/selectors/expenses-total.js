// Get expenses total
export default (expenses = []) => {
  return expenses
    .map((expense) => expense.amount)
    .reduce((accumulator, currentValue = 0) => {
      return accumulator + currentValue;
    }, 0);
};
