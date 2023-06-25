import React, { Fragment, useEffect } from "react";
import NewForm from "../components/NewForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function New() {
  const isLoggedIn = useSelector((state) => state.authHandler.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signup");
    }
  });
  return (
    <Fragment>
      <NewForm />
    </Fragment>
  );
}

export default New;
