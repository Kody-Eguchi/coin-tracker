import UserProfile from "./UserProfile";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function UserPage() {
  const { isLoggedIn, user, fetchUserData } = useAuth();
  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          {isLoggedIn && user ? (
            <UserProfile />
          ) : (
            <div className="text-center mt-4">
              <p>You are not logged in.</p>
              <Link to="/login" className="btn btn-primary">
                Go to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
