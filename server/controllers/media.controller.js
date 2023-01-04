import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const list = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });

    return responseHandler.ok(res, list);
  } catch {
    responseHandler.error(res);
  }
};

const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    const genres = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.ok(res, genres);
  } catch {
    responseHandler.error(res);
  }
};
