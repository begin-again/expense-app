import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';

export class AddExpense extends React.Component {
  onSubmit = (expense) => {
    this.props.addExpense(expense);
    this.props.history.push('/');
  };

  render() {
    const template =
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            onSubmit={this.onSubmit} 
          />
        </div>
    </div>;
    return template;
  }
  
};

const mapDispatchToProps = (dispatch) => (
  {
    addExpense: expense => dispatch(startAddExpense(expense))

  }
);

export default connect(undefined, mapDispatchToProps)(AddExpense);
