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
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the styles
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const FlexibleComponent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [postData, setPostData] = useState({});
  const [images, setImages] = useState([]);
  const [owner, setOwner] = useState(null);
  const [ownerID, setOwnerID] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [roomID, setRoomID] = useState("")
  const { id } = useParams();
  const user_id = useSelector((state) => state.authHandler.user_id);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        const data = response.data;
        // console.log(data);
        const name = data.owner.firstname + " " + data.owner.lastname;
        setPostData(data.post);
        setImages(data.urls);
        setOwner(name);
        setOwnerID(data.post.user_id);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPost();
  }, [id]);

  useEffect(() => {
    if (ownerID === user_id) {
      setShowEdit(true);
    } else {
      setShowEdit(false);
    }
  }, [ownerID, user_id]);
  // const handlePrevious = () => {
  //   setCurrentSlide((prevSlide) => prevSlide - 1);
  // };

  // const handleNext = () => {
  //   setCurrentSlide((prevSlide) => prevSlide + 1);
  // };

  const chatHandler=  async () => {
    const post_id = postData.post_id
    const body = {ownerID, user_id, post_id }
    // console.log(body);
    try {
      const response = await axios.post("http://localhost:5000/roomId", body )
      const roomID = response.data.roomID
      console.log(roomID);
    } catch (error) {
      console.log(error.message);
    }
  }
  
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
              {images.map((image) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "400px",
                    }}
                  >
                    <img
                      src={image.url}
                      alt="pet 1"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                );
              })}
              {/* <Box
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
              </Box> */}
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
              {showEdit && (
                <Link to="edit">
                  <Button
                    sx={{ position: "absolute", bottom: "8px", right: "8px" }}
                    variant="contained"
                  >
                    Edit
                  </Button>
                </Link>
              )}
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
          <Card sx={{ marginTop: "30px" }}>
            {/* Second Right Card */}
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <AccountBoxIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <Typography variant="h6">{owner}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Link to="/chat">
                    <Button
                      variant="contained"
                      fullWidth
                      endIcon={<QuestionAnswerIcon />}
                      onClick={chatHandler}
                    >
                      Chat with seller
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FlexibleComponent;
