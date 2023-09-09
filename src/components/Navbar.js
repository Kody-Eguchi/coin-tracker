import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add-transaction">Add Transaction</NavLink>
        <NavLink to="/transaction-history">Transaction History</NavLink>
        <NavLink to="/goal">Goal</NavLink>
        <NavLink to="/user-page">User</NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
