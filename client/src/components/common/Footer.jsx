import React from "react";
import { Paper, Stack } from "@mui/material";
import Container from "./Container";

const Footer = () => {
  return (
    <Container>
      <Paper square={true} sx={{ backgroundImage: "unset", padding: "2rem" }}>
        <Stack alignItems="center"></Stack>
      </Paper>
    </Container>
  );
};

export default Footer;
