// Importing necessary components and styles from MUI and React
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch } from "react-redux";
import { registerAction } from "../store/auth/authActions";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { selectAuthErrData, selectUser } from "../store/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link as LinkR } from "react-router-dom";

// Initial state for the form
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// Initial state for error handling
const initialErrorState = {
  firstName: false,
  lastName: false,
  email: false,
  password: false,
  confirmPassword: false,
};

// Component for user registration (sign up)
export default function Register() {
  // Redux dispatch and navigation hook
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorData = useSelector(selectAuthErrData);
  const user = useSelector(selectUser);

  // State management
  const [image, setImage] = React.useState(undefined);
  const [formData, setFormData] = React.useState(initialState);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(initialErrorState);

  // Toggles password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Handles input change in the form fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError({ ...error, [e.target.name]: false });
  };

  // Handles form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Validation checks for form fields
    if (
      formData.firstName.length === 0 ||
      formData.lastName.length === 0 ||
      !formData.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) ||
      !formData.password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ) ||
      formData.confirmPassword !== formData.password
    ) {
      setError({
        firstName: formData.firstName.length === 0,
        lastName: formData.lastName.length === 0,
        email: !formData.email.match(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        ),
        password: !formData.password.match(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
        confirmPassword: formData.confirmPassword !== formData.password,
      });
    } else {
      /* const formDataCopy = new FormData();
      formDataCopy.append("firstName", formData.firstName);
      formDataCopy.append("lastName", formData.lastName);
      formDataCopy.append("email", formData.email);
      formDataCopy.append("password", formData.password); */
      /* if (formData.profile_image) {
        formDataCopy.append("profile_image", formData.profile_image);
      } */
      const { confirmPassword, ...formDataCopy } = formData;
      // Dispatches sign-up action if form data is valid
      dispatch(registerAction(formDataCopy));
    }
  };

  const addImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return setImage(undefined);
    setImage(URL.createObjectURL(file));
    setFormData({ ...formData, profile_image: file });
  };

  // JSX code for rendering the sign-up form
  return (
    <Container sx={{ pt: 2 }} maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box display="flex" justifyContent="center">
          <Box position={"relative"}>
            <IconButton
              sx={{ position: "absolute", bottom: 0, right: -20, zIndex: 1 }}
              component="label"
            >
              <PhotoCamera />
              <input
                hidden
                onChange={(e) => addImage(e)}
                accept="image/*"
                multiple
                type="file"
              />
            </IconButton>
            <Avatar
              src={image}
              sx={{ width: "100px", height: "100px", fontSize: 50 }}
            >
              {formData.firstName.charAt(0)}
            </Avatar>
          </Box>
        </Box>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                helperText={
                  error.firstName ? "Please enter your first name." : false
                }
                value={formData.firstName}
                inputProps={{ maxLength: 20 }}
                error={error.firstName}
                onChange={handleChange}
              />
            </Grid>
            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                inputProps={{ maxLength: 20 }}
                helperText={
                  error.lastName ? "Please enter your last name." : false
                }
                error={error.lastName}
                onChange={handleChange}
              />
            </Grid>
            {/* Email */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={formData.email}
                error={error.email}
                helperText={
                  error.email ? "Please enter your email correctly." : false
                }
                onChange={handleChange}
              />
            </Grid>
            {/* Password */}
            <Grid item xs={12}>
              <FormControl
                error={error.password}
                required
                fullWidth
                variant="outlined"
              >
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <FormHelperText>
                  {error.password
                    ? "Password must be at least 8 chars long, contain 1 number and 1 special char."
                    : false}
                </FormHelperText>
              </FormControl>
            </Grid>
            {/* Confirm Password */}
            <Grid pt={2} item xs={12}>
              <FormControl
                error={error.confirmPassword}
                required
                fullWidth
                variant="outlined"
              >
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput
                  type="password"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  name="confirmPassword"
                  label="Confirm Password"
                />
                <FormHelperText>
                  {error.confirmPassword ? "Passwords don't match." : false}
                </FormHelperText>
              </FormControl>
            </Grid>
            {/* Checkbox */}
            <Grid item xs={12}>
              {errorData?.email && (
                <Typography color="error" variant="body2">
                  Email is used.
                </Typography>
              )}
            </Grid>
          </Grid>
          {/* Sign-up Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          {/* Link to Sign In */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={LinkR} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
