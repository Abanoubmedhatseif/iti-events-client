import { useParams } from "react-router-dom";

function EventDetails() {
  const { eventId } = useParams();

  return (
    <div>
      <h1>Event Details</h1>
      <p>ID: {eventId}</p>
    </div>
  );
}

export default EventDetails;
