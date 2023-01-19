import React, { cloneElement, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs.js";
import { themeModes } from "../../configs/theme.configs.js";
import { setAuthModalOpen } from "../../redux/features/authModalSlice.js";
import { setThemeMode } from "../../redux/features/themeModeSlice.js";
import Logo from "./Logo";

const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  // Potential buggy place
  const color =
    themeMode === themeModes.dark ? "primary.contrastText" : "text.primary";
  const backgroundColor =
    themeMode === themeModes.dark ? "transparent" : "background.paper";
  //----------------------
  return cloneElement(children, { sx: { color, backgroundColor } });
};
const Topbar = () => {
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };
  return (
    <>
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon></MenuIcon>
              </IconButton>

              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <Logo />
              </Box>

              <Box
                flexGrow={1}
                alignItems="center"
                display={{ xs: "none", md: "flex" }}
              >
                <Box sx={{ marginRight: "30px" }}>
                  <Logo />
                </Box>
              </Box>
            </Stack>
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </>
  );
};

export default Topbar;
