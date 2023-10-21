import React from "react";

function GoalItem({ goal, currentBalance, deleteGoal }) {
  const formattedDate = new Date(goal.target_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{goal.description}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          ${currentBalance > 0 ? currentBalance : 0}/{goal.goal_amount}
        </h6>
        <p className="card-text">Target Date: {formattedDate}</p>
        <button
          className="btn btn-danger"
          onClick={() => deleteGoal(goal.goal_id)}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default GoalItem;
