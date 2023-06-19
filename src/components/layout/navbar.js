
import React, { Fragment, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Fragment>
      <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="/">
            <span className="navbar-logo">Paw Mart</span>
          </NavLink>

          <Link
            role="button"
            className={`navbar-burger ${isMenuOpen ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </Link>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <NavLink className="navbar-item" to="/posts" onClick={closeMenu}>
              Home
            </NavLink>

            <NavLink className="navbar-item" to="/posts/new" onClick={closeMenu}>
              Sell
            </NavLink>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <NavLink className="button is-primary" to="/signup" onClick={closeMenu}>
                  <strong>Sign up</strong>
                </NavLink>
                <NavLink className="button is-light" to="/login" onClick={closeMenu}>
                  Log in
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default Navbar;
