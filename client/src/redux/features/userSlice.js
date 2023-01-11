import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    listFavorites: [],
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) localStorage.removeItem("token");
      if (action.payload.token)
        localStorage.setItem("token", action.payload.token);

      state.user = action.payload;
    },
    setFavoritesList: (state, action) => (state.listFavorites = action.payload),
    removeFavorite: (state, action) => {
      const { mediaId } = action.payload;
      state.listFavorites = [...state.listFavorites].filter(
        (favorite) => favorite.mediaId.toString() !== mediaId.toString()
      );
    },
    addFavorite: (state, action) =>
      (state.listFavorites = [...state.listFavorites, action.payload]),
  },
});

export const { setUser, setFavoritesList, removeFavorite, addFavorite } =
  userSlice.actions;

export default userSlice.reducer;
