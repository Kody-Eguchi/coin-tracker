import React, { useEffect, useState } from "react";
import Login from "./Login";
import UserProfile from "./UserProfile";
import { useAuth } from "../../hooks/useAuth";

function UserPage() {
  const { isLoggedIn, user } = useAuth();

  return (
    <div>
      <h1>User Page</h1>
      {isLoggedIn ? <UserProfile user={user} /> : <Login />}
    </div>
  );
}

export default UserPage;
