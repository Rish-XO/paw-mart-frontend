import { Container, Typography } from "@mui/material";
import React from "react";
import PetCard from "./layout/PetCard";



function Posts() {
  return (
    <Container maxWidth="md" sx={{
     height: "100vh",
     display: "flex",
     flexDirection: "column",
     alignContent: 'center',
     alignItems: "center"
      
    }}>
      <Typography variant="h1" sx={{
      }}>Browse your Pets</Typography>
     
      <PetCard />
    </Container>
  );
}

export default Posts;
