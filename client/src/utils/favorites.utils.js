const favoriteUtils = {
  check: ({ listFavorites, mediaId }) =>
    listFavorites &&
    listFavorites.find(
      (fav) => fav.mediaId.toString() === mediaId.toString()
    ) !== undefined,
};

export default favoriteUtils;
