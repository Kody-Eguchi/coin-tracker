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
    <div className="card my-4">
      <div className="card-body">
        <h5 className="card-title">Create a Goal</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              type="text"
              name="description"
              value={goalData.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="goal_amount" className="form-label">
              Goal Amount:
            </label>
            <input
              type="number"
              name="goal_amount"
              value={goalData.goal_amount}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="target_date" className="form-label">
              Target Date (Year-Month-Day):
            </label>
            <input
              type="date"
              name="target_date"
              value={goalData.target_date}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Goal
          </button>
        </form>
      </div>
    </div>
  );
}

export default GoalForm;
