import Cookies from "js-cookie";
import api from "../../config/axios-config";

export const fetchGoals = async (callback) => {
  try {
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await api.get("/goal", { headers });
    const goals = response.data;
    callback(goals);
  } catch (error) {
    console.error("Error fetching transaction history:", error);
  }
};
