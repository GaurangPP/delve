import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

export const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src="/delve_logo.jpg" alt="Delve Logo" className="logo-image" />
          </Link>
        </div>
      </nav>
    </>
  );
};
