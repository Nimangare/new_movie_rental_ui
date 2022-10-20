import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_Endpoint = process.env.RECAT_APP_API_URL;
const initialState = {
  token: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    auth(state, action) {
      state.token = action.payload;
    },
  },
});

export default loginSlice.reducer;
export const { auth } = loginSlice.actions;

// redux-thunk
export const loginThunk = (user) => {
  return async (dispatch, getState) => {
    await axios
      .post(API_Endpoint + "users/login", user)
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("token", res.data);
        dispatch(auth(res.data));
      })
      .catch((err) => console.log(err.message));
  };
};
