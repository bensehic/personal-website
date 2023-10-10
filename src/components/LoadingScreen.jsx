import React from "react";
import { Container, CircularProgress, Backdrop } from "@mui/material";

function LoadingScreen({ loading }) {
  return (
    <Container maxWidth="md">
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}

export default LoadingScreen;
