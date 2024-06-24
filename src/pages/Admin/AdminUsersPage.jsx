import { useState } from "react";
import Table from "../../components/reusables/table";
import DeleteConfirmationDialog from "../../components/reusables/DeleteConfirmationDialogue";
import { Snackbar } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

function AdminUsersPage() {
  const [openConfrimationDialogue, setOpenConfrimationDialogue] =
    useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  function handleOpenConfirmationDialogue(user) {
    setUserToDelete(user);
    setOpenConfrimationDialogue(true);
  }
  function handleCloseConfirmationDialogue() {
    setUserToDelete(null);
    setOpenConfrimationDialogue(false);
  }

  function handleDeleteUser() {
    if (userToDelete) {
      setUsers(Users.filter((u) => u.id !== userToDelete.id));
      setShowSuccessMessage(true);
      handleCloseConfirmationDialogue();
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
      <Table data={Users} handler={handleOpenConfirmationDialogue} />

      <DeleteConfirmationDialog
        open={openConfrimationDialogue}
        onClose={handleCloseConfirmationDialogue}
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
