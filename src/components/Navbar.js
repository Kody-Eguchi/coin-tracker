import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add-transaction">Add Transaction</NavLink>
        <NavLink to="/transaction-history">Transaction History</NavLink>
        <NavLink to="/goal">Goal</NavLink>

        {isLoggedIn ? (
          <div>
            <button onClick={handleLogout}>Log Out</button>
            <NavLink to="/user-page">User</NavLink>
          </div>
        ) : (
          <NavLink to="/login">Log In</NavLink>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
