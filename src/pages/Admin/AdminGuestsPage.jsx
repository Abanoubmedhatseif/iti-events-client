import { Error } from "@mui/icons-material";
import Loader from "../../components/reusables/loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPendingAttendees } from "../../store/Events/attedneesSlice";
import { ImgMediaCard as Card } from "../../components/reusables/Card";
import {
  acceptAttendee,
  rejectAttendee,
} from "../../store/Events/attedneesSlice";
import { Snackbar } from "@mui/material";

function AdminGuestsPage() {
  const dispatch = useDispatch();
  const attendees = useSelector((state) => state.attednees.pendingAttendees);
  const loading = useSelector((state) => state.attednees.loading);
  const error = useSelector((state) => state.attednees.error);

  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    dispatch(fetchPendingAttendees());
  }, [dispatch]);

  useEffect(() => {
    setShowErrorMessage(!!error);
  }, [error]);

  function handleApporve(attendeeId) {
    dispatch(acceptAttendee(attendeeId));
    setApproved(true);
    setTimeout(() => {
      setApproved(false);
    }, 5000);
  }

  function handleReject(attendeeId) {
    dispatch(rejectAttendee(attendeeId));
    setRejected(true);
    setTimeout(() => {
      setRejected(false);
    }, 5000);
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error>error</Error>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px",
      }}
    >
      {attendees.length > 0 ? (
        attendees?.map((attendee) => (
          <Card
            key={attendee.id}
            title={
              attendee.user
                ? `${attendee.user?.firstName} ${attendee.user?.lastName}`
                : "Guest"
            }
            description={
              attendee?.event?.name?.substring(0, 28) + "..." || "Event"
            }
            imageSrc={attendee?.receipt?.imageUrl}
            action1="Accept"
            action2="Reject"
            handler1={() => {
              handleApporve(attendee.id);
            }}
            handler2={() => {
              handleReject(attendee.id);
            }}
          />
        ))
      ) : (
        <h1>No pending guests</h1>
      )}
      <Snackbar
        open={approved}
        autoHideDuration={5000}
        onClose={() => setApproved(false)}
        message="Guest approved"
      />
      <Snackbar
        open={rejected}
        autoHideDuration={5000}
        onClose={() => setRejected(false)}
        message="Guest rejected"
      />
      <Snackbar
        open={showErrorMessage}
        autoHideDuration={5000}
        onClose={() => setShowErrorMessage(false)}
        message="An error occurred"
      />
    </div>
  );
}

export default AdminGuestsPage;
