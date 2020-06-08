import React, { useContext, useEffect } from 'react';
import {
  CardPanel,
  Collection,
  CollectionItem,
  Row,
  Col,
  Button,
} from 'react-materialize';
import ExpenseItem from './ExpenseItem';
import ConfirmModal from '../Utils/ConfirmModal';
import ExpenseContext from '../../../context/Expense/expenseContext';
import ToastContext from '../../../context/Toasts/ToastContext';

const ExpensesList = () => {
  const expenseContext = useContext(ExpenseContext);
  const toastContext = useContext(ToastContext);

  const { setToast } = toastContext;
  const {
    expenses,
    clearAllExpense,
    removeToastMode,
    toastMode,
  } = expenseContext;

  useEffect(() => {
    if (toastMode === 'edit') setToast('Updated successfully');
    else if (toastMode === 'delete') setToast('Deleted successfully');
    removeToastMode();
    // eslint-disable-next-line
  }, [toastMode]);

  const createExpenseItem = (expense) => (
    <ExpenseItem {...expense} key={expense.id} />
  );

  return (
    <CardPanel className="green darken-1">
      <h4>Your Expenses</h4>
      <Collection className="black-text">
        {expenses.length > 0 ? (
          expenses.map(createExpenseItem)
        ) : (
          <CollectionItem>No expenses added. Enter an expense</CollectionItem>
        )}
      </Collection>
      {expenses.length > 0 && (
        <Row>
          <Col>
            <ConfirmModal
              onClick={clearAllExpense}
              trigger={
                <Button className="purple darken-2">Clear Expenses</Button>
              }
              message="Are you sure you want to delete all expenses?"
            />
          </Col>
        </Row>
      )}
    </CardPanel>
  );
};

export default ExpensesList;
