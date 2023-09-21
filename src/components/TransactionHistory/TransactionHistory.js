import { useEffect, useState } from "react";
import { fetchTransactionHistory } from "../helper/transactionHistoryHelpers";
import TransactionHistoryItem from "./TransactionHistoryItem";
import api from "../../config/axios-config";
import Cookies from "js-cookie";

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

  console.log(transactionHistory);

  const deleteTransaction = async (transactionId) => {
    setTransactionHistory((prevTransactionHistory) =>
      prevTransactionHistory.filter(
        (transaction) => transaction.transaction_id !== transactionId
      )
    );

    const token = Cookies.get("token");
    try {
      const response = await api.delete("/transactions/delete", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          transaction_id: transactionId,
        },
      });

      if (response.status === 200) {
        console.log("Transaction deleted successfully");

        fetchTransactionHistory((data) => {
          setTransactionHistory(data);
        });
      } else {
        console.error("Error deleting transaction");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div>
      <h1>TransactionHistory</h1>
      <div>
        <p>Spending Total: {spendingTotal}</p>
        <p>Income Total: {incomeTotal}</p>
        <p>Current Balance: {currentBalance}</p>
      </div>
      {transactionHistory.length > 0 ? (
        transactionHistory.map((transaction, index) => (
          <TransactionHistoryItem
            key={index}
            transaction={transaction}
            deleteTransaction={deleteTransaction}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TransactionHistory;
