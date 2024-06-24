import { useState } from "react";
import Table from "../../components/reusables/table";
import DeleteConfirmationDialog from "../../components/reusables/DeleteConfirmationDialogue";
import { Snackbar } from "@mui/material";

function AdminUsersPage() {
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  function handleOpen(user) {
    setUserToDelete(user);
    setOpen(true);
  }
  function handleClose() {
    setUserToDelete(null);
    setOpen(false);
  }

  function handleDeleteUser() {
    if (userToDelete) {
      setUsers(Users.filter((u) => u.id !== userToDelete.id));
      setShowSuccessMessage(true);
      handleClose();
    }
  }

  const [Users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  ]);

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        marginTop: "40px",
      }}
    >
      <Table data={Users} handleDelete={handleOpen} />
      <DeleteConfirmationDialog
        open={open}
        onClose={handleClose}
        onConfirm={handleDeleteUser}
        item={userToDelete}
      />
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={4000}
        onClose={() => setShowSuccessMessage(false)}
        message="User Deleted Successfully"
      />
    </div>
  );
}

export default AdminUsersPage;
