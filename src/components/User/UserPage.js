import React, { useEffect, useState } from "react";
import Login from "./Login";
import UserProfile from "./UserProfile";
import Cookies from "js-cookie";
import api from "../../config/axios-config";

function UserPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token, "🔑");
    if (token) {
      api
        .get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error retrieving user information", error);
        });
    }
  }, []);

  return (
    <div>
      <h1>User Page</h1>
      {user ? <UserProfile user={user} /> : <Login />}
    </div>
  );
}

export default UserPage;
