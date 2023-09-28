import React, { useState } from "react";
import api from "../../config/axios-config";
import Cookies from "js-cookie";
import { fetchGoals } from "../helper/goalHelper";

function GoalForm({ setGoals }) {
  const [goalData, setGoalData] = useState({
    description: "",
    goal_amount: "",
    target_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalData({
      ...goalData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    try {
      const response = await api.post("/goal", goalData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        console.log("Goal created successfully");
        fetchGoals((data) => {
          setGoals(data);
        });
      } else {
        console.error("Failed to create goal");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {" "}
      <h2>Create a Goal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={goalData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Goal Amount:</label>
          <input
            type="number"
            name="goal_amount"
            value={goalData.goal_amount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Target Date:</label>
          <input
            type="datetime-local"
            name="target_date"
            value={goalData.target_date}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Goal</button>
      </form>
    </div>
  );
}

export default GoalForm;
