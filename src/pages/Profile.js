import React from "react";
import { useParams } from "react-router";
import Navbar from "../components/layout/Navbar";
import { Container, Typography } from "@mui/material";
import PetCard from "../components/layout/PetCard";

function Profile() {
  const { userID } = useParams();
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
