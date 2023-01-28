import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import Topbar from "../common/Topbar";
import AuthModal from "../common/AuthModal";
import { toast } from "react-toastify";
import userApi from "../../api/modules/user.api.js";
import favoriteApi from "../../api/modules/favorite.api.js";
import { setFavoritesList, setUser } from "../../redux/features/userSlice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();
      if (response) dispatch(setUser(response));
      if (err) dispatch(setUser(null));
    };
    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getFavorites = async () => {
      const { response, err } = await favoriteApi.getList();
      if (response) dispatch(setFavoritesList(response));
      if (err) dispatch(toast.error(err.message));
    };
    if (user) getFavorites();
    if (!user) dispatch(setFavoritesList([]));
  }, [user, dispatch]);

  return (
    <>
      <GlobalLoading />
      <AuthModal />
      <Box display="flex" minHeight="100vh">
        <Topbar />
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
