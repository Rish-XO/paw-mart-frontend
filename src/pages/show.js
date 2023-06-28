import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the styles
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

const FlexibleComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [postData, setPostData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        const data = response.data;
        console.log(data);
        setPostData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPost();
  }, [id]);

  // const handlePrevious = () => {
  //   setCurrentSlide((prevSlide) => prevSlide - 1);
  // };

  // const handleNext = () => {
  //   setCurrentSlide((prevSlide) => prevSlide + 1);
  // };

  return (
    <Container sx={{ marginTop: "100px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ position: "relative" }}>
            {/* Main Card */}
            <Carousel
              selectedItem={currentSlide}
              showThumbs={false}
              showStatus={false}
              emulateTouch
              infiniteLoop
              onChange={setCurrentSlide}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "400px",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1592754862816-1a21a4ea2281?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80"
                  alt="pet 1"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "400px",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2576&q=80"
                  alt="pet 2"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "400px",
                }}
              >
                <img
                  src="https://pawmartbucket.s3.eu-north-1.amazonaws.com/1687933763764_caleb-fisher-eZiTbYKgDSs-unsplash.jpg"
                  alt="pet 3"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              {/* Add more images as needed */}
            </Carousel>
            <Container>
              <Typography variant="h6" gutterBottom>
                {`price : ${postData.price} `}
              </Typography>
              <Typography variant="h5">Description</Typography>
              <Typography variant="body2" sx={{ marginBottom: "30px" }}>
                {postData.description}
              </Typography>
              <Link to="edit">
                <Button
                  sx={{ position: "absolute", bottom: "8px", right: "8px" }}
                  variant="contained"
                >
                  Edit
                </Button>
              </Link>
            </Container>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            {/* First Right Card */}
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Right Card 1
              </Typography>
              <Typography variant="body2">Right Card 1 Content</Typography>
            </CardContent>
          </Card>
          <Card>
            {/* Second Right Card */}
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Right Card 2
              </Typography>
              <Typography variant="body2">Right Card 2 Content</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FlexibleComponent;
