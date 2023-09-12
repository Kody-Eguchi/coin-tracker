import { useEffect, useState } from "react";
import { fetchTransactionHistory } from "../helper/transactionHistoryHelpers";

function TransactionHistory() {
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    fetchTransactionHistory((data) => {
      setTransactionHistory(data);
    });
  }, []);

  const { amount, description, transaction_date } = transactionHistory;

  return (
    <div>
      <h1>TransactionHistory</h1>
      <div>
        <p>amount: {amount}</p>
        <p>description: {description}</p>
        <p>transaction date: {transaction_date}</p>
      </div>
    </div>
  );
}

export default TransactionHistory;
