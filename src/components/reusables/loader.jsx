import { CircularProgress, Typography } from "@mui/material";

function loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
      <Typography variant="h6" component="div" style={{ marginLeft: "16px" }}>
        Loading...
      </Typography>
    </div>
  );
}

export default loader;
