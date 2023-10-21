import { useEffect, useState } from "react";
import { fetchGoals } from "../helper/goalHelper";
import GoalItem from "./GoalItem";
import { fetchTransactionHistory } from "../helper/transactionHistoryHelpers";
import GoalForm from "./GoalForm";
import api from "../../config/axios-config";
import Cookies from "js-cookie";

function Goal() {
  const [goals, setGoals] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    fetchGoals((data) => {
      setGoals(data);
    });

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

    const newCurrentBalance = newIncomeTotal - newSpendingTotal;
    setCurrentBalance(newCurrentBalance);
  }, [transactionHistory]);

  console.log(goals);
  console.log(currentBalance);

  // DELETE A GOAL BY ID FUNCTION
  const deleteGoal = async (goalId) => {
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

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <h1 className="mt-4">Goals</h1>
          <GoalForm setGoals={setGoals} />
          {goals.length > 0 ? (
            goals.map((goal, index) => (
              <GoalItem
                key={index}
                goal={goal}
                currentBalance={currentBalance}
                deleteGoal={deleteGoal}
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

export default Goal;
