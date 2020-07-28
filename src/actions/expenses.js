import firebase from "../firebase/firebase";

// Synch
// component calls action generator
// action generator returns object
// component dispatches object
// redux store changes - using reducers (pure function)

// Async - start....
// component calls action generator
// action generator returns function
// component dispatches function (redux middleware supports this functionality)
// firebase gets updated (CRUD operation)
// function runs - dispatches other actions that update redux

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense,
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;
    const expense = { description, note, amount, createdAt };
    return firebase
      .database()
      .ref("expenses")
      .push(expense)
      .then((ref) => {
        dispatch(addExpense({ id: ref.key, ...expense }));
      });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

// export const startRemoveExpense = () => {
//   return (dispatch) => {
//     firebase.database()
//       .ref(`expenses/${ref.key}`)
//       .remove()
//       .then((ref) => {
//         dispatch(removeExpense(ref.key));
//       });
//   };
// };

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});
