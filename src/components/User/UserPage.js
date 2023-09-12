import UserProfile from "./UserProfile";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function UserPage() {
  const { isLoggedIn, user, fetchUserData } = useAuth();
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div>
      <h1>User Page</h1>
      {isLoggedIn && user ? (
        <UserProfile />
      ) : (
        <Link to="/login">Go to Login</Link>
      )}
    </div>
  );
}

export default UserPage;
