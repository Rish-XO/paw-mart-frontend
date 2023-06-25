import React, { Fragment, useEffect, useState } from "react";
import NewForm from "../components/NewForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

function New() {
  const isLoggedIn = useSelector((state) => state.authHandler.isLoggedIn);
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkAuthenticated = async () => {
    try {
      const res = await axios.post("http://localhost:5000/is-verify", null, {
        headers: {
          token: localStorage.getItem('token') ? localStorage.getItem('token') : 'jababa'
        }
      });
  
      const parseRes = res.data;
      console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      setIsAuthenticated(false)
      console.log(err.message);
    }
  };
  
  console.log(isAuthenticated);
  useEffect(() => {
    checkAuthenticated();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signup");
    }
  },[isLoggedIn,navigate]);
  return (
    <Fragment>
      <NewForm />
    </Fragment>
  );
}

export default New;
