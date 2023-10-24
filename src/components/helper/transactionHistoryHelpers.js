import Cookies from "js-cookie";
import api from "../../config/axios-config";

export const fetchTransactionHistory = async (callback) => {
  try {
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await api.get("/transactions/history", { headers });
    const transactionHistory = response.data;
    callback(transactionHistory);
  } catch (error) {
    console.error("Error fetching transaction history:", error);
  }
};

export const deleteTransaction = async (
  transactionId,
  setTransactionHistory
) => {
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

    if (response.status === 201) {
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
