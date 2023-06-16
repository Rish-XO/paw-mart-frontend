import { Container, Typography } from "@mui/material";
import React from "react";
import PetCard from "./layout/PetCard";



function Posts() {
  return (
    <Container  sx={{
     height: "100vh",
     display: "flex",
     flexDirection: "column",
     alignContent: 'center',
     alignItems: "center"
      
    }}>
      <Typography variant="h1" sx={{ marginBottom : '30px'}}>Browse your Pets</Typography>
     
      <PetCard />
    </Container>
  );
}

export default Posts;
