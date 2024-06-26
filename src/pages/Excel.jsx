import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import * as XLSX from "xlsx";
import { createAdmin } from "../store/users/usersSlice";

const processExcel = (file, setError, setUsers) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Check if headers are correct
    const headers = jsonData[0];
    if (
      headers.length !== 4 ||
      headers[0] !== "firstName" ||
      headers[1] !== "lastName" ||
      headers[2] !== "birthdate" ||
      headers[3] !== "email"
    ) {
      setError(
        "Invalid file format. Expected headers: firstName, lastName, birthdate, email"
      );
      return;
    }

    // Process data
    const users = jsonData.slice(1).map((row) => ({
      firstName: row[0],
      lastName: row[1],
      birthdate: row[2],
      email: row[3],
      role: "student",
    }));

    setUsers(users);
    setError("");
  };
  reader.readAsArrayBuffer(file);
};

const ExcelUploader = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      processExcel(file, setError, setUsers);
      setOpen(true); // Open the confirmation modal
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    dispatch(createAdmin(users));

    setOpen(false);
    setUsers([]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Upload Excel File
      </Typography>
      <input
        accept=".xlsx, .xls"
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="contained"
          component="span"
          style={{ margin: "10px 0" }}
        >
          Upload
        </Button>
      </label>
      {error && <Typography color="error">{error}</Typography>}
      {users.length > 0 && (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Confirm User Creation</DialogTitle>
          <DialogContent
            dividers
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <DialogContentText>
              Are you sure you want to create these students?
            </DialogContentText>
            <List>
              {users.map((user, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                    secondary={`${user.birthdate} - ${user.email} - ${user.role}`}
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ExcelUploader;
