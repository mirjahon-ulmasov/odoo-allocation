import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NotificationManager } from "react-notifications";
import { API } from "../services/setting";
import axios from "axios";
import { getPath } from "utils";

const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk(
  "auth/login",
  async ({ data, navigate }, thunkAPI) => {
    try {
      const response = await axios.post(
        API + "/account/login/",
        JSON.stringify(data),
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status !== 200) {
        throw new Error("Bad Request");
      }
      const user = await response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);
      localStorage.setItem("email", user.email);
      NotificationManager.success("Login Success", "", 2000);
      navigate(getPath(user));
      return user;
    } catch (err) {
      NotificationManager.error("User not found", "", 2000);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", (navigate, thunkAPI) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  thunkAPI.dispatch(clearAuth());
  navigate("/login");
});

const getInitState = () => {
  if (user) return { isLoggedIn: true, user, loading: false };
  else return { isLoggedIn: false, user: null, loading: false };
};

const initialState = getInitState();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    [login.rejected]: (state) => {
      state.user = null;
      state.loading = false;
      state.isLoggedIn = false;
    },
  },
});

const { clearAuth } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
