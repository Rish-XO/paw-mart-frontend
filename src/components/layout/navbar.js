import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "../../utils/store/authSlice";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authHandler.isLoggedIn);
  console.log("loggedIN:",isLoggedIn);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const logoutSubmit = () => {
    dispatch(logoutHandler())
    closeMenu()
  }
  return (
    <Fragment>
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="/">
            <span className="navbar-logo">Paw Mart</span>
          </NavLink>

          <button
            className={`navbar-burger ${isMenuOpen ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? "is-active" : ""}`}>
          <div className="navbar-start">
            <NavLink className="navbar-item" to="/posts" onClick={closeMenu}>
              Home
            </NavLink>

            <NavLink
              className="navbar-item"
              to="/posts/new"
              onClick={closeMenu}
            >
              Sell
            </NavLink>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {isLoggedIn && (
                  <NavLink
                    className="button is-primary"
                    to="#"
                    onClick={closeMenu}
                  >
                    <AccountCircleIcon />
                  </NavLink>
                )}
                {!isLoggedIn && (
                  <>
                    <NavLink
                      className="button is-primary"
                      to="/signup"
                      onClick={closeMenu}
                    >
                      <strong>Sign up</strong>
                    </NavLink>
                    <NavLink
                      className="button is-light"
                      to="/login"
                      onClick={closeMenu}
                    >
                      Log in
                    </NavLink>
                  </>
                )}
                {isLoggedIn && 
                <NavLink
                  className="button is-light"
                  to="#"
                  onClick={logoutSubmit}
                >
                  Logout
                </NavLink>
                }
              </div>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default Navbar;
