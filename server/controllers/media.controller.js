import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

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

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    const searchData = await tmdbApi.mediaSearch({
      mediaType: "people" ? "person" : mediaType,
      query,
      page,
    });

    return responseHandler.ok(res, searchData);
  } catch {
    responseHandler.error(res);
  }
};

const getDetails = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;
    const params = { mediaType, mediaId };

    const media = await tmdbApi.mediaDetails(params);
    const credits = await tmdbApi.mediaCredits(params);
    const videos = await tmdbApi.mediaVideos(params);
    const recommend = await tmdbApi.mediaRecommend(params);
    const images = await tmdbApi.mediaImages(params);

    media.credits = credits;
    media.videos = videos;
    media.recommend = recommend.results;
    media.images = images;

    const tokenDecoded = tokenMiddleware.tokenDecode(req);

    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);

      if (user) {
        const isFavorite = await favoriteModel.findOne({
          user: user.id,
          mediaId,
        });
        media.isFavorite = isFavorite !== null;
      }
    }

    media.reviews = await reviewModel
      .findOne({ mediaId })
      .populate("user")
      .sort("-createdAt");

    responseHandler.ok(res, media);
  } catch {
    responseHandler.error(res);
  }
};

export default { getList, getGenres, search, getDetails };