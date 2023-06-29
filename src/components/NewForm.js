import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const categories = ["dog", "cat", "fish", "bird", "others"];

const CreatePostForm = () => {
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageURL, setImageURL] = useState([]);
  const [loading, setLoading]= useState(false)
   const user_id = useSelector((state) => state.authHandler.user_id);
  // console.log(user_id);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic error checking
    const formErrors = {};

    if (!category) {
      formErrors.category = "Category is required";
    }
    if (!breed.trim()) {
      formErrors.breed = "Breed is required";
    }
    if (!price) {
      formErrors.price = "Price is required";
    }
    if (!description.trim()) {
      formErrors.description = "Description is required";
    }
    if (!image || image.length === 0) {
      formErrors.image = "Image is required";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  setLoading(true)
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }

    console.log(formData);

    // Submit the form
    try {
      // Upload image first
      const uploadResponse = await axios.post(
        "http://localhost:5000/uploadimages",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const imageUrlsFromServer = await uploadResponse.data.imageUrls;

      console.log("image Ulrs are ", imageUrlsFromServer);

      setImageURL(...imageUrlsFromServer);
      // console.log(imageURL);

      const body = {
        category,
        breed,
        price,
        description,
        user_id,
        imageUrlsFromServer,
      };
      const response = await axios.post(
        "http://localhost:5000/posts/new",
        body
      );
      const id = response.data.post_id;
      console.log(id);
      // console.log(imageURL, "IMAGEEEs");
      setLoading(false)
      navigate(`/posts/${id}`);
    } catch (error) {
      setLoading(false)
      console.log(error.message);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleBreedChange = (event) => {
    setBreed(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    console.log(files);
    setImage(files);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 10 }}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="div">
              Create a Post
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel variant="outlined">Category</InputLabel>
              <Select
                value={category}
                onChange={handleCategoryChange}
                error={!!errors.category}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.category && (
              <Typography color="error">{errors.category}</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Breed"
              value={breed}
              onChange={handleBreedChange}
              fullWidth
              error={!!errors.breed}
              helperText={errors.breed}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={handlePriceChange}
              fullWidth
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              value={description}
              onChange={handleDescriptionChange}
              fullWidth
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            {errors.image && (
              <Typography color="error">{errors.image}</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            {!loading &&
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            }
            {loading && <CircularProgress />}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreatePostForm;
