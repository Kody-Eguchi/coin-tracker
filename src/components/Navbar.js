import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
        <NavLink activeClassName="active" to="/add-transaction">
          Add Transaction
        </NavLink>
        <NavLink activeClassName="active" to="/transaction-history">
          Transaction History
        </NavLink>
        <NavLink activeClassName="active" to="/goal">
          Goal
        </NavLink>
        <NavLink activeClassName="active" to="/user-page">
          User
        </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
