import { useHttp } from "../hooks/useHttp";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  authToken: null,
  authLoadingStatus: "idle",
  username: "",
  password: "",
};

export const toLogin = createAsyncThunk("auth/login", (formData) => {
  const { request } = useHttp();
  return request({
    url: "https://test-assignment.emphasoft.com/api/v1/login/",
    method: "POST",
    body: JSON.stringify(formData),
  });
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state) => {
      state.authToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toLogin.pending, (state) => {
        state.authLoadingStatus = "loading";
      })
      .addCase(toLogin.fulfilled, (state, action) => {
        state.authLoadingStatus = "idle";
        state.authToken = action.payload.token;
        state.username = action.meta.arg.username;
        state.password = action.meta.arg.password;
      })
      .addCase(toLogin.rejected, (state) => {
        state.authLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = authSlice;

export default reducer;
export const { handleLogout } = actions;
