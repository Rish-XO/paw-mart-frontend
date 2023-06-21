import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const categories = ["dog", "cat", "fish", "bird", "others"];

const EditForm = () => {
  const [category, setCategory] = useState("");
  const [breed, setBreed] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const {id} = useParams()

  const navigate = useNavigate()

  // fetching the corresponding post data
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        const data = response.data;
       setCategory(data.category)
       setBreed(data.breed)
       setPrice(data.price)
       setDescription(data.description)
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPost();
  }, [id]);

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

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Submit the form
    try {
      const body = { category, breed, price, description };
      const response = await axios.put(
        `http://localhost:5000/posts/${id}/edit`,
        body
      );
      navigate(-1);
    } catch (error) {
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
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <Container maxWidth="sm" sx={{marginTop: 10}}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="div">
              Edit Your Post
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
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Edit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditForm;
