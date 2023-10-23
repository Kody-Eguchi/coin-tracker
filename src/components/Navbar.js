import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>

        <div className="navbar" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {isLoggedIn && (
              <>
                <NavLink className="nav-link" to="/add-transaction">
                  Add Transaction
                </NavLink>
                <NavLink className="nav-link" to="/transaction-history">
                  Transaction History
                </NavLink>
                <NavLink className="nav-link" to="/goal">
                  Goal
                </NavLink>
              </>
            )}

            {isLoggedIn ? (
              <>
                <NavLink className="nav-link" to="/user-page">
                  User
                </NavLink>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <NavLink className="nav-link" to="/login">
                  Log In
                </NavLink>
                <NavLink className="nav-link" to="/signup">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
