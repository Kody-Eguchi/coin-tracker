import React from "react";

function TransactionHistoryItem({ transaction, deleteTransaction }) {
  return (
    <div>
      <p>amount: ${transaction.amount}</p>
      <p>description: {transaction.description}</p>
      <p>transaction date: {transaction.transaction_date}</p>
      <p>Spending Category: {transaction.category.category_name}</p>
      <p>Type: {transaction.category.type}</p>
      <p>frequency: {transaction.frequency.frequency_name}</p>
      <button onClick={() => deleteTransaction(transaction.transaction_id)}>
        ❌
      </button>
    </div>
  );
}

export default TransactionHistoryItem;
