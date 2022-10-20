import { REGISTER_USER } from "./types";
import axios from "axios";

export const registerUser = (user) => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/users", user)
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
