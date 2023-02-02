import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AutoPlay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import PlayIconArrow from "@mui/icons-material/PlayArrow";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import CircularRate from "./CircularRate";

import { setGlobalLoading } from "../../redux/features/globalLoadingSlice.js";
import { routesGen } from "../../routes/routes";
import genreApi from "../../api/modules/genre.api.js";
import mediaApi from "../../api/modules/media.api.js";

import uiConfigs from "../../configs/ui.configs.js";
import tmdbConfigs from "../../api/configs/tmdb.configs";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const getMedias = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });
      if (response) setMovies(response.results);
      if (err) toast.error(err.message);
      dispatch(setGlobalLoading(false));
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getList({
        mediaType,
      });
      if (response) {
        setGenres(response.genres);
        getMedias();
      }
      if (err) {
        toast.error(err.message);
      }
      dispatch(setGlobalLoading(false));
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <Box
      sx={{
        position: "relative",
        color: "primary.contrastText",
        "&::before": {
          content: '""',
          width: "100%",
          height: "30%",
          position: "absolute",
          botom: 0,
          left: 0,
          zIndex: 2,
          pointerEvent: "none",
          ...uiConfigs.style.gradientBgImage[theme.pallete.mode],
        },
      }}
    ></Box>
  );
};

export default HeroSlide;
