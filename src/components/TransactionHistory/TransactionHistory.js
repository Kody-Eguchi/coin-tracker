import { useEffect, useState } from "react";
import { fetchTransactionHistory } from "../helper/transactionHistoryHelpers";
import TransactionHistoryItem from "./TransactionHistoryItem";

function TransactionHistory() {
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    fetchTransactionHistory((data) => {
      setTransactionHistory(data);
    });
  }, []);

  console.log(transactionHistory);
  return (
    <div>
      <h1>TransactionHistory</h1>
      {transactionHistory.length > 0 ? (
        transactionHistory.map((transaction, index) => (
          <TransactionHistoryItem key={index} transaction={transaction} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TransactionHistory;
