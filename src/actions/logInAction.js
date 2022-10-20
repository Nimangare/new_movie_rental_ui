import axios from "axios";
import { LOGIN_USER } from "./types";
const API_Endpoint = process.env.REACT_APP_API_URL;
export const logInUser = (user) => {
  return (dispatch) => {
    axios
      .post(API_Endpoint + "users/login", user)
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
