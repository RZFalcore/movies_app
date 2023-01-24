import React from "react";
import {
  Drawer,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  List,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

import Logo from "./Logo";
import menuConfigs from "../../configs/menu.configs";
import uiConfigs from "../../configs/ui.configs.js";
import { themeModes } from "../../configs/theme.configs";
import { setThemeMode } from "../../redux/features/themeModeSlice";

const Sidebar = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const sideBarWidth = uiConfigs.size.sidebarWidth;

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: "30px" }}>
        <Typography variant="h6" marginBottom="20px" textTransform="uppercase">
          menu
        </Typography>

        {menuConfigs.main.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              borderRadius: "10px",
              marginY: 1,
              backgroundColor: appState.includes(item.state)
                ? "primary.main"
                : "unset",
            }}
            component={Link}
            to={item.path}
            onClick={() => toggleSidebar(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography textTransform="uppercase">
                  {item.display}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
        {user && (
          <>
            <Typography
              variant="h6"
              marginBottom="20px"
              textTransform="uppercase"
            >
              personal
            </Typography>
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                key={index}
                sx={{
                  borderRadius: "10px",
                  marginY: 1,
                  backgroundColor: appState.includes(item.state)
                    ? "primary.main"
                    : "unset",
                }}
                component={Link}
                to={item.path}
                onClick={() => toggleSidebar(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {item.display}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
          </>
        )}

        <Typography variant="h6" marginBottom="20px" textTransform="uppercase">
          theme
        </Typography>
        <ListItemButton onClick={onSwitchTheme}>
          <ListItemIcon>
            {themeMode === themeModes.dark ? (
              <DarkModeOutlinedIcon />
            ) : (
              <WbSunnyOutlinedIcon />
            )}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography textTransform="uppercase">
                {themeMode === themeModes.dark ? "dark mode" : "light mode"}
              </Typography>
            }
          ></ListItemText>
        </ListItemButton>
      </List>
    </>
  );
  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        "& .MuiDrawer-Paper": {
          boxSizing: "border-box",
          width: sideBarWidth,
          borderRight: 0,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
