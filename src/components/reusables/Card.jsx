import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export function ImgMediaCard({
  action1,
  action2 = "",
  handler1,
  handler2 = "",
  description,
  imageSrc,
  title,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ width: 350, height: 300, margin: "10px", padding: "10px" }}>
      <CardMedia
        component="img"
        alt="no image provided"
        height="120"
        image={imageSrc}
        onClick={handleClickOpen}
        style={{ cursor: "pointer" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          style={{
            backgroundColor: "green",
            color: "white",
            marginTop: "16px",
          }}
          onClick={handler1}
        >
          {action1}
        </Button>
        {action2 && handler2 && (
          <Button
            variant="contained"
            style={{
              backgroundColor: "#901b20",
              color: "white",
              marginTop: "16px",
            }}
            onClick={handler2}
          >
            {action2}
          </Button>
        )}
      </CardActions>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {/* eslint-disable */}
          <img
            src={imageSrc}
            alt="No image was provided"
            style={{ width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
