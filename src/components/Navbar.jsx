import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>BMD Rentals</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cars">Cars</Link>
        
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;
