import { configureStore } from "@reduxks/toolkit";
import userSlice from "./features/userSlice";

const store = configureStore({
  reducer: { user: userSlice },
});

export default store;
