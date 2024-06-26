import { useEffect, useState } from "react";
import { Button, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllUsers } from "../../store/users/usersSlice";
import AdminTable from "../../components/reusables/adminsTable";
import CreateAdminModal from "../../components/createAdminModal";
import Loader from "../../components/reusables/loader";

function AdminUsersPage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const Admins = users.filter((user) => user.role === "admin");

  function handleSuccessMessageClose() {
    setShowSuccessMessage(false);
  }

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setShowErrorMessage(!!error);
  }, [error]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        marginTop: "40px",
      }}
    >
      <Button
        variant="contained"
        style={{
          backgroundColor: "#901b20",
          color: "white",
          marginTop: "16px",
        }}
        onClick={() => setShowCreateUserModal(true)}
      >
        Create new admin account
      </Button>
      <AdminTable data={Admins} />

      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={4000}
        onClose={() => setShowSuccessMessage(false)}
        message="User Created Successfully"
      />
      <Snackbar
        open={showErrorMessage}
        autoHideDuration={4000}
        onClose={() => setShowErrorMessage(false)}
        message="encountered an error please try again later"
      />
      <CreateAdminModal
        open={showCreateUserModal}
        handleSuccessMessageClose={handleSuccessMessageClose}
        handleClose={() => setShowCreateUserModal(false)}
      />
    </div>
  );
}

export default AdminUsersPage;
