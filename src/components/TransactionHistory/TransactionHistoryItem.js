import React from "react";

function TransactionHistoryItem({ transaction, deleteTransaction }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Transaction Details</h5>
        <p className="card-text">Amount: ${transaction.amount}</p>
        <p className="card-text">Description: {transaction.description}</p>
        <p className="card-text">
          Transaction Date: {transaction.transaction_date}
        </p>
        <p className="card-text">
          Spending Category: {transaction.category.category_name}
        </p>
        <p className="card-text">Type: {transaction.category.type}</p>
        <p className="card-text">
          Frequency: {transaction.frequency.frequency_name}
        </p>
        <button
          className="btn btn-danger"
          onClick={() => deleteTransaction(transaction.transaction_id)}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default TransactionHistoryItem;
