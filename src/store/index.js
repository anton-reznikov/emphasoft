import { configureStore } from "@reduxjs/toolkit";

import { usersApi } from "../api/usersApi";
import auth from "../slices/authSlice";

const store = configureStore({
  reducer: { [usersApi.reducerPath]: usersApi.reducer, auth },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export default store;
