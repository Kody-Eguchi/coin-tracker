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
