import { useEffect, useState } from "react";
import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllUsers, deleteUser } from "../../store/users/usersSlice";
import DeleteConfirmationDialog from "../../components/reusables/DeleteConfirmationDialogue";
import Table from "../../components/reusables/table";

function AdminUsersPage() {
  const [userToDelete, setUserToDelete] = useState(null);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  const [openConfrimationDialogue, setOpenConfrimationDialogue] =
    useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const UsersWithoutAdmins = users.filter((user) => user.role !== "admin");

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setShowErrorMessage(!!error);
  }, [error]);

  function handleOpenConfirmationDialogue(user) {
    setUserToDelete(user);
    setOpenConfrimationDialogue(true);
  }

  function handleCloseConfirmationDialogue() {
    setUserToDelete(null);
    setOpenConfrimationDialogue(false);
  }

  function handleDeleteUser() {
    console.log(userToDelete);
    if (userToDelete) {
      dispatch(deleteUser(userToDelete.id));
      setShowSuccessMessage(true);
      handleCloseConfirmationDialogue();
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        marginTop: "40px",
      }}
    >
      <Table
        data={UsersWithoutAdmins}
        handler={handleOpenConfirmationDialogue}
      />

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
      <Snackbar
        open={showErrorMessage}
        autoHideDuration={4000}
        onClose={() => setShowErrorMessage(false)}
        message="encountered an error please try again later"
      />
    </div>
  );
}

export default AdminUsersPage;
