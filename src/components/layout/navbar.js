
import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  return (
    <Fragment>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="/">
            {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="PawMart" /> */}
            <span className="navbar-logo">Paw Mart</span>
            
          </NavLink>

          <Link
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <NavLink className="navbar-item" to="/posts">
              Home
            </NavLink>

            <NavLink className="navbar-item" to="/posts/new">
             Sell
            </NavLink>

            {/* <div className="navbar-item has-dropdown is-hoverable">
              <NavLink className="navbar-link" to="/more">
                More
              </NavLink>

              <div className="navbar-dropdown">
                <NavLink className="navbar-item" to="/more/about">
                  About
                </NavLink>
                <NavLink className="navbar-item" to="/more/jobs">
                  Jobs
                </NavLink>
                <NavLink className="navbar-item" to="/more/contact">
                  Contact
                </NavLink>
                <hr className="navbar-divider" />
                <NavLink className="navbar-item" to="/more/report">
                  Report an issue
                </NavLink>
              </div>
            </div> */}

          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <NavLink className="button is-primary" to="/signup">
                  <strong>Sign up</strong>
                </NavLink>
                <NavLink className="button is-light" to="/login">
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

