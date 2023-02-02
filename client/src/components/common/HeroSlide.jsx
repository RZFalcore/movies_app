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
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });
      if (response) setMovies(response.results);
      if (err) toast.error(err.message);
      dispatch(setGlobalLoading(false));
    };
  }, [mediaType, mediaCategory, dispatch]);

  return <>Hero slide</>;
};

export default HeroSlide;
