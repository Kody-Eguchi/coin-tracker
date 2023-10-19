import React from "react";
import { useAuth } from "../../hooks/useAuth";

function UserProfile() {
  const { user } = useAuth();
  return (
    <div className="text-center">
      <div className="card bg-light" style={{ maxWidth: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title text-success">User Profile</h5>
          <div className="mb-3">
            <h4>Username:</h4>
            <p className="user-info">{user.username}</p>
          </div>
          <div className="mb-3">
            <h4>Email:</h4>
            <p className="user-info">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
