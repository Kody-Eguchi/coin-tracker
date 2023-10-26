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

export const deleteGoal = async (goalId, setGoals) => {
  setGoals((prevGoal) => prevGoal.filter((goal) => goal.goal_id !== goalId));

  const token = Cookies.get("token");
  try {
    const response = await api.delete("/goal/delete", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        goal_id: goalId,
      },
    });

    if (response.status === 200) {
      console.log("Goal deleted successfully");

      fetchGoals((data) => {
        setGoals(data);
      });
    } else {
      console.error("Error deleting goal");
    }
  } catch (error) {
    console.error("Error deleting goal:", error);
  }
};
