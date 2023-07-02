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
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
  const [imageUrls, setImageUrls] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  // fetching the corresponding post data
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        const data = response.data.post;
        const urls = response.data.urls;
        setCategory(data.category);
        setBreed(data.breed);
        setPrice(data.price);
        setDescription(data.description);
        setImageUrls(urls);
        console.log(data, urls);
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
      const body = { category, breed, price, description, imageUrls };
      const response = await axios.put(
        `http://localhost:5000/posts/${id}/edit`,
        body
      );
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

  const handleImageDelete = (urlId) => {
    // Filter out the deleted image URL
    const updatedUrls = imageUrls.filter((url) => url.image_id !== urlId);
    setImageUrls(updatedUrls);
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 10, marginBottom:"10px" }}>
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

          {/* image previews */}
          <Grid item xs={12}>
            <Typography>Remove images</Typography>
            {imageUrls.map((url) => (
              <div
                style={{ position: "relative", display: "inline-block" }}
                key={url.image_id}
              >
                <img
                  src={url.url}
                  alt="Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "10px",
                  }}
                />
                <IconButton
                  color=""
                  size="small"
                  style={{ position: "absolute", top: "", right: "5px" , color: "red"}}
                  onClick={() => handleImageDelete(url.image_id)}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            ))}
          </Grid>

          <Grid item xs={12}>
            {/* <label>Add more Images  </label> */}
            <Button variant="contained" color="success">
            <input  className="" type="file" accept="image/*" multiple onChange={handleImageUpload} />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={goBack}
            >
              Edit
            </Button>
            <Button
              sx={{ marginLeft: "50px" }}
              variant="contained"
              color="secondary"
              onClick={goBack}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditForm;
