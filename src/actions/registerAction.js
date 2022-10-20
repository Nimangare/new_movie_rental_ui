import { REGISTER_USER } from "./types";
import axios from "axios";
const API_Endpoint = process.env.REACT_APP_API_URL;
export const registerUser = (user) => {
  return (dispatch) => {
    axios
      .post(API_Endpoint + "users", user)
      .then((response) => {
        dispatch({
          type: REGISTER_USER,
          user: response.data,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};
