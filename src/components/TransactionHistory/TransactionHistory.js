import { useEffect, useState } from "react";
import {
  fetchTransactionHistory,
  deleteTransaction,
} from "../helper/transactionHistoryHelpers";
import TransactionHistoryItem from "./TransactionHistoryItem";
import TransactionHistoryTotal from "./TransactionHistoryTotal";

function TransactionHistory() {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [spendingTotal, setSpendingTotal] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    fetchTransactionHistory((data) => {
      setTransactionHistory(data);
    });
  }, []);

  useEffect(() => {
    let newSpendingTotal = 0;
    let newIncomeTotal = 0;

    transactionHistory.forEach((transaction) => {
      const categoryType = transaction.category.type;
      const amount = parseFloat(transaction.amount);

      if (categoryType === "Spending") {
        newSpendingTotal += amount;
      } else if (categoryType === "Income") {
        newIncomeTotal += amount;
      }
    });

    setSpendingTotal(newSpendingTotal);
    setIncomeTotal(newIncomeTotal);

    const newCurrentBalance = newIncomeTotal - newSpendingTotal;
    setCurrentBalance(newCurrentBalance);
  }, [transactionHistory]);

  const handleDeleteTransaction = async (transactionId) => {
    deleteTransaction(transactionId, setTransactionHistory);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <h1 className="mt-4">Transaction History</h1>
          <TransactionHistoryTotal
            spendingTotal={spendingTotal}
            incomeTotal={incomeTotal}
            currentBalance={currentBalance}
          />
          {transactionHistory.length > 0 ? (
            transactionHistory.map((transaction, index) => (
              <TransactionHistoryItem
                key={index}
                transaction={transaction}
                deleteTransaction={handleDeleteTransaction}
              />
            ))
          ) : (
            <p className="mt-4">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
