import axios from "axios";
import {
  ADD_MOVIE,
  DELETE_MOVIE,
  GET_ALL_MOVIES,
  TOGGLE_LIKED,
  UPDATE_MOVIE,
  FILTER_MOVIE,
  COUNT_MOVIE,
  GET_PFS,
  GET_CURRENT_MOVIE,
} from "./types";
const API_Endpoint = process.env.REACT_APP_API_URL;
export const getAllMovies = () => {
  return (dispatch, getState) => {
    axios
      .get(API_Endpoint + "movies")
      .then((response) => {
        console.log(response.data);
        dispatch({ type: GET_ALL_MOVIES, movies: response.data });
      })
      .catch((err) => console.log(err.message));
  };
};

export const getCurrentMovie = (id) => {
  return (dispatch, getState) => {
    axios
      .get(API_Endpoint + `movies/${id}`)
      .then((response) => {
        // console.log(response.data);
        dispatch({ type: GET_CURRENT_MOVIE, movie: response.data });
      })
      .catch((err) => console.log(err.message));
  };
};

export const getPFS = (data) => {
  return (dispatch, getState) => {
    axios
      .post(API_Endpoint + "movies/pfs", data)
      .then((response) => {
        // console.log("response.data", response.data);
        dispatch({ type: GET_PFS, movies: response.data });
      })
      .catch((err) => console.log(err.message));
  };
};

export const addMovie = (movie) => {
  return (dispatch, getState) => {
    axios
      .post(
        API_Endpoint + "movies",
        {
          title: movie.title,
          genreId: movie.genre,
          dailyRentalRate: movie.dailyRentalRate,
          numberInStock: movie.numberInStock,
          publishdate: movie.publishdate,
          liked: movie.liked,
        },
        {
          headers: {
            "x-auth-token": getState().loginReducer.token,
          },
        }
      )
      .then((response) => dispatch({ type: ADD_MOVIE, movie: response.data }))
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const deleteMovie = (id) => {
  return (dispatch, getState) => {
    axios
      .delete(API_Endpoint + `movies/${id}`, {
        headers: {
          "x-auth-token": getState().loginReducer.token,
        },
      })
      .then((response) =>
        dispatch({ type: DELETE_MOVIE, id: response.data._id })
      )
      .catch((err) => console.log(err.message));
  };
};

export const updatemovie = (movie) => {
  return (dispatch, getState) => {
    axios
      .put(
        API_Endpoint + `movies/${movie._id}`,
        {
          title: movie.title,
          genreId: movie.genre,
          dailyRentalRate: movie.dailyRentalRate,
          numberInStock: movie.numberInStock,
          publishdate: movie.publishdate,
          liked: movie.liked,
        },
        {
          headers: {
            "x-auth-token": getState().loginReducer.token,
          },
        }
      )
      .then((response) => {
        dispatch({ type: UPDATE_MOVIE, movie: response.data });
      })
      .catch((err) => console.log(err.message));
  };
};

export const toggleLiked = (id, movie) => {
  return (dispatch, getState) => {
    // console.log(id , movie.liked);
    axios
      .patch(
        API_Endpoint + `movies/${id}`,
        {
          liked: !movie.liked,
        },
        {
          headers: {
            "x-auth-token": getState().loginReducer.token,
          },
        }
      )
      .then((response) => {
        dispatch({ type: TOGGLE_LIKED, movie: response.data });
      })
      .catch((err) => console.log(err.message));
  };
};

export const filterMovies = (id) => {
  return {
    type: FILTER_MOVIE,
    id,
  };
};

export const countMovie = (data) => {
  return (dispatch, getState) => {
    axios
      .post(API_Endpoint + "movies/count", data)
      .then((response) => {
        dispatch({
          type: COUNT_MOVIE,
          count: response.data,
        });
      })
      .catch((err) => console.log(err.message));
  };
};
