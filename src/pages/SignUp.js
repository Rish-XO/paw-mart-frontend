import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Navbar from "../components/layout/Navbar";
import axios from "axios";
import { loginHandler } from "../utils/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignUp() {
  const [initialLoad, setInitialLoad] = useState(true);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authHandler.isLoggedIn);
  const userRole = useSelector((state) => state.authHandler.role);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // console.log("isLoggedIn:", isLoggedIn);
    // console.log("userRole:", userRole);
    if (isLoggedIn && !initialLoad) {
      navigate("/posts");
    } else {
      setInitialLoad(false);
      navigate("/signup");
    }
  }, [isLoggedIn, navigate, initialLoad]);

  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const initialFormErrors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic error checking
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (formData.password.length < 8) {
      errors.password = "Password should be at least 8 characters long";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Form is valid, submit the data
    console.log("Form data:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        formData
      );
      const { token, role } = response.data;
      console.log(token, role);

      //verifying token
      // const check = await axios.post("http://localhost:5000/is-verify",null, {
      //   headers: {
      //     token: `${token}`
      //   }
      // })
      // if(check.data === true){}

      dispatch(loginHandler({ token, role }));

      const { from } = location.state || { from: "/posts" };
      console.log(from);
      console.log(isLoggedIn, userRole);
      navigate(from);
    } catch (error) {
      console.log(error.response.data);
      console.log(error.message);
    }

    // Clear form data and errors
    setFormData(initialFormState);
    setFormErrors(initialFormErrors);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <React.Fragment>
      <Navbar />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={!!formErrors.firstName}
                    helperText={formErrors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={!!formErrors.lastName}
                    helperText={formErrors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
