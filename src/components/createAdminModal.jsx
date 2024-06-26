import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createAdmin } from "../store/users/usersSlice";

const CreateAdminModal = ({ open, handleClose, handleSuccessMessageClose }) => {
  const dispatch = useDispatch();

  const [AdminFirstName, setAdminFirstName] = useState("");
  const [AdminLastName, setAdminLastName] = useState("");
  const [AdminEmail, setAdminEmail] = useState("");
  const [AdminPassword, setAdminPassword] = useState("");
  const [PasswordType, setPasswordType] = useState("password");
  const [AdminBirthdate, setAdminBirthdate] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    setErrors({});
  }, [
    AdminFirstName,
    AdminLastName,
    AdminEmail,
    AdminPassword,
    AdminBirthdate,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = {
        firstName: AdminFirstName,
        lastName: AdminLastName,
        email: AdminEmail,
        password: AdminPassword,
        birthdate: AdminBirthdate,
        role: "admin",
      };

      try {
        const response = await dispatch(createAdmin(formData));
        if (response.error) {
          setShowErrorMessage(true);
          setTimeout(() => {
            setShowErrorMessage(false);
          }, 4000);
          throw new Error(
            response.error.message || "Failed to create admin account"
          );
        }
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
        resetForm();
        handleClose();
        handleSuccessMessageClose();
      } catch (error) {
        console.error("Failed to create admin account:", error);
        setErrors({ ...errors, requestError: error.message });
      }
    }
  };

  function handleShowPassword(e) {
    e.preventDefault();
    if (PasswordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }

  const resetForm = () => {
    setAdminFirstName("");
    setAdminLastName("");
    setAdminEmail("");
    setAdminPassword("");
    setAdminBirthdate("");
    setErrors({});
  };

  const validateForm = () => {
    let errors = {};
    setErrors({});
    if (!AdminFirstName.trim()) {
      errors.firstName = "First Name is required";
    }
    if (!AdminLastName.trim()) {
      errors.lastName = "Last Name is required";
    }
    if (!AdminEmail.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(AdminEmail)) {
      errors.email = "Invalid email format";
    }
    if (!AdminPassword.trim()) {
      errors.password = "Password is required";
    }
    if (!AdminBirthdate.trim()) {
      errors.birthdate = "Birthdate is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleModalClose = () => {
    resetForm();
    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            p: 2,
            backgroundColor: "#dedede",
            borderRadius: 2,
            maxWidth: "500px",
            width: "90%",
            maxHeight: "90vh",
            overflowY: "auto",
            margin: "auto",
            marginTop: "5vh",
            marginBottom: "5vh",
          }}
        >
          <Typography variant="h6" component="h2" style={{ color: "#901b20" }}>
            Create Admin account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={AdminFirstName}
              onChange={(e) => setAdminFirstName(e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
              InputLabelProps={{
                style: { color: "#901b20" },
              }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={AdminLastName}
              onChange={(e) => setAdminLastName(e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
              InputLabelProps={{
                style: { color: "#901b20" },
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={AdminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              InputLabelProps={{
                style: { color: "#901b20" },
              }}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                label="Password"
                variant="outlined"
                margin="normal"
                type={PasswordType}
                value={AdminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                InputLabelProps={{
                  style: { color: "#901b20" },
                }}
                style={{ width: "calc(100% - 80px)" }}
              />
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  marginLeft: "8px",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
                onClick={handleShowPassword}
              >
                {PasswordType === "password" ? "😄" : "😃"}
              </button>
            </div>
            <TextField
              label="Birthdate"
              variant="outlined"
              fullWidth
              margin="normal"
              type="date"
              value={AdminBirthdate}
              onChange={(e) => setAdminBirthdate(e.target.value)}
              error={!!errors.birthdate}
              helperText={errors.birthdate}
              InputLabelProps={{
                style: { color: "#901b20" },
                shrink: true,
              }}
            />

            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "#901b20",
                color: "white",
                marginTop: "16px",
              }}
              fullWidth
            >
              Create
            </Button>
            <Button
              onClick={handleModalClose}
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                marginTop: "8px",
              }}
              fullWidth
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={5000}
        onClose={() => setShowSuccessMessage(false)}
        message="Admin account created successfully"
      />
      <Snackbar
        open={showErrorMessage}
        autoHideDuration={5000}
        onClose={() => setShowErrorMessage(false)}
        message={errors.requestError || "Failed to create admin account"}
      />
    </>
  );
};

export default CreateAdminModal;
