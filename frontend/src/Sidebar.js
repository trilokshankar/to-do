import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/expenses">Expenses</Link>
      <Link to="/filter">Filter</Link>
      <Link to="/logout">Logout</Link>
    </nav>
  );
}

export default Navbar;
