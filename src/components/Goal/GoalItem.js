import React from "react";

function GoalItem({ goal, currentBalance }) {
  return (
    <div>
      <h1>{goal.description}</h1>
      <h2>
        ${currentBalance > 0 ? currentBalance : 0}/{goal.goal_amount}
      </h2>
      <p>Target Date: {goal.target_date}</p>
    </div>
  );
}

export default GoalItem;
