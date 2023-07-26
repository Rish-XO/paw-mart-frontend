import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PetCard from "./layout/PetCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { snackBarDetailsAdder } from "../utils/store/snackbarSlice";

function Posts() {
  const dispatch = useDispatch();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts");
        const data = response.data;
        setPets(data);
      } catch (error) {
        dispatch(
          snackBarDetailsAdder({
            severity: "error",
            message: "Server Error, Try again",
          })
        );
        console.log(error.message);
      }
    };
    getPosts();
  }, [dispatch]);

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1" sx={{ marginBottom: "40px", marginTop: "60px" }}>
        Browse your Pets
      </Typography>
      <PetCard pets={pets} />
    </Container>
  );
}

export default Posts;
