import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-header">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Delve
          </Link>
        </div>

        <div className="navbar-container">
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fa-solid fa-times' : 'fa-solid fa-bars'}></i>
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/moodlog' className="nav-links" onClick={closeMobileMenu}>
                Moodlog
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/resources' className="nav-links" onClick={closeMobileMenu}>
                Resources
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
