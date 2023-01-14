import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material/styles";
import themeConfigs from "./configs/theme.configs";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode);
  return (
    <ThemeProvider theme={themeConfigs.custom({ themeMode })}>
      // Toastify configs
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
      // MUI reset css
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
