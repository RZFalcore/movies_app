import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Paper, Box, LinearProgress, Toolbar } from "@mui/material";

const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Paper></Paper>
    </>
  );
};

export default GlobalLoading;
