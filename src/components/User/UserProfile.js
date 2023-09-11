import React from "react";
import { useAuth } from "../../hooks/useAuth";

function UserProfile() {
  const { user } = useAuth();
  return (
    <div>
      <h1>User Profile!!!</h1>
      <p>{user.username}</p>
      <p>{user.email}</p>
    </div>
  );
}

export default UserProfile;
