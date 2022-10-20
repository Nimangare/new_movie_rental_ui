import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
      .post("http://localhost:5000/users/login", user)
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("token", res.data);
        dispatch(auth(res.data));
      })
      .catch((err) => console.log(err.message));
  };
};
