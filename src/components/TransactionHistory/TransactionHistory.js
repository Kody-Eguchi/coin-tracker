import { useEffect, useState } from "react";
import { fetchTransactionHistory } from "../helper/transactionHistoryHelpers";
import TransactionHistoryItem from "./TransactionHistoryItem";

function TransactionHistory() {
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    fetchTransactionHistory((data) => {
      if (Array.isArray(data)) {
        // If it's an array, set it directly
        setTransactionHistory(data);
      } else if (typeof data === "object") {
        // If it's an object, wrap it in an array
        setTransactionHistory([data]);
      }
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
