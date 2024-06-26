import { Error } from "@mui/icons-material";
import Loader from "../../components/reusables/loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPendingAttendees } from "../../store/Events/attedneesSlice";
import { ImgMediaCard as Card } from "../../components/reusables/Card";
import {
  acceptAttendee,
  rejectAttendee,
} from "../../store/Events/attedneesSlice";

function AdminGuestsPage() {
  const dispatch = useDispatch();
  const attendees = useSelector((state) => state.attednees.pendingAttendees);
  const loading = useSelector((state) => state.attednees.loading);
  const error = useSelector((state) => state.attednees.error);

  useEffect(() => {
    dispatch(fetchPendingAttendees());
  }, [dispatch]);

  function handleApporve(attendeeId) {
    console.log(attendeeId);
    dispatch(acceptAttendee(attendeeId));
  }

  function handleReject(attendeeId) {
    console.log(attendeeId);
    dispatch(rejectAttendee(attendeeId));
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
            description={attendee?.event?.name || "Event"}
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
    </div>
  );
}

export default AdminGuestsPage;
