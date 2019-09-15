import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense, startEditExpense } from '../actions/expenses';


export class EditExpense extends React.Component {
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense)
    this.props.history.push('/');
  }

  onRemove = () => {
    this.props.removeExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  }

  render() {
    const template =
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    ;
    return template;
  }
};

const mapStateToProps = (state, props) => (
  {
    expense: state.expenses.find(expense => expense.id === props.match.params.id)
  }
);

const mapDispatchToProps = (dispatch, props) => (
  {
    editExpense: (id, expense) => dispatch(startEditExpense(id,expense)),
    removeExpense: (data) => dispatch(startRemoveExpense(data))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
