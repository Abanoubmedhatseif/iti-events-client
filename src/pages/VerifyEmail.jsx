import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyEmailAction } from "../store/auth/authActions";
import useQuery from "../hooks/useQuery";

const VerifyEmail = () => {
  const queryParams = useQuery();
  const token = queryParams.get("token");
  const id = queryParams.get("id");

  const dispatch = useDispatch();
  const handleCLick = () => {
    dispatch(verifyEmailAction(token));
  };
  useEffect(() => {
    if (token && id) {
      dispatch(verifyEmailAction(token, id));
    }
  }, [dispatch, token, id]);

  return token ? (
    <Box
      height={600}
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Paper>
        <Typography>You will be redirected automatically, if not:</Typography>
        <Button onClick={handleCLick}>Click here to confirm email</Button>
      </Paper>
    </Box>
  ) : (
    <Box
      height={600}
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Paper>
        <Typography>
          Please check the conformation email in your mailbox.
        </Typography>
      </Paper>
    </Box>
  );
};

export default VerifyEmail;
