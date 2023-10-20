import React from "react";

function TransactionHistoryTotal({
  spendingTotal,
  incomeTotal,
  currentBalance,
}) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Financial Summary</h5>
        <p className="card-text">Spending Total: {spendingTotal}</p>
        <p className="card-text">Income Total: {incomeTotal}</p>
        <p className="card-text">Current Balance: {currentBalance}</p>
      </div>
    </div>
  );
}

export default TransactionHistoryTotal;
