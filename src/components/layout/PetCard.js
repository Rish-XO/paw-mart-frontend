import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Typography, Grid } from "@mui/material";
import "./PetCard.css";
import { Link } from "react-router-dom";
import axios from "axios";

// const pets = [
//   {
//     id: 1,
//     category: "dog",
//     breed: "Labrador Retriever",
//     price: 500,
//     description: "Friendly and energetic. Loves playing fetch.",
//   },
//   {
//     id: 2,
//     category: "cat",
//     breed: "Persian",
//     price: 300,
//     description: "Independent and affectionate. Requires grooming.",
//   },
//   {
//     id: 3,
//     category: "dog",
//     breed: "German Shepherd",
//     price: 700,
//     description: "Intelligent and loyal. Excellent for protection.",
//   },
//   {
//     id: 4,
//     category: "fish",
//     breed: "Goldfish",
//     price: 10,
//     description: "Colorful and low-maintenance. Suitable for beginners.",
//   },
//   {
//     id: 5,
//     category: "dog",
//     breed: "Poodle",
//     price: 600,
//     description: "Hypoallergenic and highly trainable. Great with kids.",
//   },
//   {
//     id: 6,
//     category: "cat",
//     breed: "Siamese",
//     price: 250,
//     description: "Vocal and social. Known for their striking blue eyes.",
//   },
//   {
//     id: 7,
//     category: "bird",
//     breed: "Parakeet",
//     price: 50,
//     description: "Small and playful. Can be taught to mimic words.",
//   },
//   {
//     id: 8,
//     category: "dog",
//     breed: "Bulldog",
//     price: 800,
//     description: "Calm and friendly. Requires regular exercise.",
//   },
// ];

function PetCard() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    console.log("card loading");
    const getPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts");
        const data = response.data;
        console.log(data);
        setPets(data)
      } catch (error) {
        console.log(error.message);
      }
    };
    getPosts();
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center">
      {pets.map((pet) => (
        <Grid item xs={12} sm={6} md={4} key={pet.id}>
          <Link to={`${pet.id}`}>
            <Card className="card-item" sx={{ maxWidth: 345 }} key={pet.id}>
              <CardMedia
                sx={{
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                image="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
                title="green iguana"
              />
              <CardContent sx={{ paddingTop: "8px", paddingBottom: "8px" }}>
                <Typography gutterBottom variant="h5" component="div">
                  ₹ {pet.price}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Breed: {pet.breed}
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                  {pet.category}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                {pet.description}
              </Typography> */}
              </CardContent>
              <CardActions>
                <Link to={`${pet.id}`}>
                  <div className="card-button">
                    <Button variant="contained" size="small">
                      View
                    </Button>
                  </div>
                </Link>
              </CardActions>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default PetCard;
