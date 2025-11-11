import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Wasatch Auto Detailing</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/contact" className="book-now-btn-small">
          Book Now
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
