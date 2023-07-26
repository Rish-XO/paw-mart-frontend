import React, { useEffect } from "react";
import { useParams } from "react-router";
import Navbar from "../components/layout/Navbar";
import { Container, Typography } from "@mui/material";
import PetCard from "../components/layout/PetCard";
import axios from "axios";

function Profile() {
  const { userID } = useParams();
  const yourPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/posts/${userID}`);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {});
  return (
    <>
      <Navbar />
      <Container>
        <Typography sx={{ marginTop: "40px" }} variant="h1">
          your posts
        </Typography>
        {/* <PetCard /> */}
      </Container>
    </>
  );
}

export default Profile;
