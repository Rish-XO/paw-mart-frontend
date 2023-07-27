import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/layout/Navbar";
import { Container, Typography } from "@mui/material";
import PetCard from "../components/layout/PetCard";
import axios from "axios";

function Profile() {
  const [pets, setPets] = useState([]);
  const { userID } = useParams();
  const yourPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/profile/${userID}`);
      setPets(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  useEffect(() => {
    yourPost();
  }, [userID]); 

  return (  
    <>  
      <Navbar />
      <Container> 
        <Typography sx={{ marginTop: "40px" , marginBottom: '20px'}} variant="h1">
          your posts  
        </Typography> 
        <PetCard pets={pets} /> 
      </Container>
    </>
  ); 
} 
 
export default Profile;
