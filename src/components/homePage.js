import React, { Fragment } from "react";
import classes from "./HomePage.module.css";
// import Footer from "./layout/Footer";
import { Link } from "react-router-dom";


function HomePage() {
  return (
    <Fragment>
      <div className={classes.maindiv}>
        <div className="columns">
          <header className={classes.title}>
            <h3 className=" is-size-2 has-text-left has-text-weight-bold has-text-white ml-6 mt-5">
              Paw Mart
            </h3>
          </header>
          <div
            className={`column ${classes.btn} mt-5 is-flex is-justify-content-flex-end is-align-items-flex-start mr-6`}
          >
            <div className="buttons">
              <Link className="button is-primary mr-5" to="signup">
                <strong>Sign up</strong>
              </Link>
              <Link className="button is-light mr-5">Log in</Link>
            </div>
          </div>
        </div>
        <div className={`main ${classes.centered}`}>
          <h4 className="is-size-4 has-text-weight-bold has-text-white">Welcome to Paw Mart</h4>
          <p className="lead has-text-white is-size-5">
            Discover a world of wagging tails and purrs at our Pet
            Shop. We offer a wide range of lovable pets. Find your perfect furry
            companion and provide them with the love and care they deserve.
          </p>
          <Link to="posts" className="button mt-5 is-size-4">View Pets</Link>
        </div>
      </div>

    </Fragment>
  );
}

export default HomePage;
