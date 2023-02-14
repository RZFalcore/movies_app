import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Paper, Box, LinearProgress, Toolbar } from "@mui/material";
import Logo from "./Logo";

const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let delay;
    if (globalLoading) {
      setIsLoading(true);
    } else {
      delay = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    return () => {
      clearTimeout(delay);
    };
  }, [globalLoading]);

  return (
    <Paper
      sx={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: "none",
        transition: "all .3sec ease",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 99,
      }}
    >
      <Toolbar />
      <LinearProgress />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Logo />
      </Box>
    </Paper>
  );
};

export default GlobalLoading;
