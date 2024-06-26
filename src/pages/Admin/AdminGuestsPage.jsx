import { Error } from "@mui/icons-material";
import Loader from "../../components/reusables/loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPendingAttendees } from "../../store/Events/attedneesSlice";
import { ImgMediaCard as Card } from "../../components/reusables/Card";

function AdminGuestsPage() {
  const dispatch = useDispatch();
  const attendees = useSelector((state) => state.attednees.pendingAttendees);
  const loading = useSelector((state) => state.attednees.loading);
  const error = useSelector((state) => state.attednees.error);

  useEffect(() => {
    dispatch(fetchPendingAttendees());
  }, [dispatch]);

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
      <div style={{ width: "300px" }}>
        {attendees.map((attendee) => (
          <Card
            key={attendee.id}
            title={
              attendee.user
                ? `${attendee.user.firstName} ${attendee.user.lastName}`
                : "Guest"
            }
            description={attendee.event.description}
            imageSrc={attendee.receipt.imageUrl}
            action1="Accept"
            action2="Reject"
            handler1={() => {
              console.log("accepted");
            }}
            handler2={() => {
              console.log("rejected");
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminGuestsPage;
