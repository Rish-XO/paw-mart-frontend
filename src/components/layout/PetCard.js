import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Typography, Grid } from "@mui/material";
import "./PetCard.css";
import { Link } from "react-router-dom";

function PetCard({ pets }) {
  return (
    <Grid container spacing={2} justifyContent="center">
      {pets.map((pet) => (
        <Grid item xs={12} sm={6} md={4} key={pet.post_id}>
          <Link to={`${pet.post_id}`}>
            <Card
              className="card-item"
              sx={{ maxWidth: 345 }}
              key={pet.post_id}
            >
              <CardMedia
                sx={{
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  objectFit: "contain",
                }}
                image={pet.first_url}
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
              </CardContent>
              <CardActions>
                <Link to={`${pet.post_id}`}>
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
