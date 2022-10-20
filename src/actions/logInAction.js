import axios from "axios";
import { LOGIN_USER } from "./types";

export const logInUser = (user) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/users/login", user)
      .then((response) => {
        console.log(response.data);
        sessionStorage.setItem("token", response.data);
        dispatch({
          type: LOGIN_USER,
          payload: {
            token: response.data,
          },
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const loadLogin = () => {
  return {
    type: LOGIN_USER,
    payload: {
      token: sessionStorage.getItem("token"),
    },
  };
};
