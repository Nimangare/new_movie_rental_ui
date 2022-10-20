import axios from "axios";
import {
  ADD_RENTAL,
  DELETE_RENTAL,
  GET_ALL_RENTALS,
  UPDATE_RENTAL,
} from "./types";

export const getAllRentals = () => {
  return (dispatch, getState) => {
    axios
      .get(`http://localhost:5000/rentals`)
      .then((response) => {
        // console.log(response.data);
        dispatch({ type: GET_ALL_RENTALS, rentals: response.data });
      })
      .catch((err) => console.log(err.message));
  };
};

export const addRental = (rental) => {
  return (dispatch, getState) => {
    axios
      .post(
        `http://localhost:5000/rentals`,
        {
          customerId: rental.customer,
          movieId: rental.movie,
        },
        {
          headers: {
            "x-auth-token": getState().loginReducer.token,
          },
        }
      )
      .then((response) => {
        dispatch({ type: ADD_RENTAL, rental: response.data });
      })
      .catch((err) => console.log(err.message));
  };
};
export const deleteRental = (id) => {
  return (dispatch, getState) => {
    axios
      .delete(`http://localhost:5000/rentals/${id}`, {
        headers: {
          "x-auth-token": getState().loginReducer.token,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch({ type: DELETE_RENTAL, id: response.data._id });
      })
      .catch((err) => console.log(err.message));
  };
};

export const patchRental = (id) => {
  return (dispatch, getState) => {
    console.log(id);
    axios
      .patch(
        `http://localhost:5000/rentals/${id}`,
        {},

        {
          headers: {
            "x-auth-token": getState().loginReducer.token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch({ type: UPDATE_RENTAL, rental: response.data });
      })
      .catch((err) => console.log(err.message));
  };
};
