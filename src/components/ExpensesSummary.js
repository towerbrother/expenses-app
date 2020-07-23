import React from "react";
import { connect } from "react-redux";
import selectExpenses from "../selectors/expenses";
import getExpensesTotal from "../selectors/expenses-total";
import numeral from "numeral";

export const ExpensesSummary = (props) => {
  const total = numeral(props.expensesTotal / 100).format("$0,0.00");
  return (
    <div>
      <p>
        {props.expensesCount === 0
          ? `No expenses`
          : props.expensesCount === 1
          ? `Viewing 1 expense totalling ${total}`
          : `Viewing ${props.expensesCount} expenses totalling ${total}`}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    expensesCount: selectExpenses(state.expenses, state.filters).length,
    expensesTotal: getExpensesTotal(
      selectExpenses(state.expenses, state.filters)
    ),
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
