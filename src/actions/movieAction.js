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

export const getAllMovies = () => {
  return (dispatch, getState) => {
    axios
      .get("http://localhost:5000/movies")
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
      .get(`http://localhost:5000/movies/${id}`)
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
      .post("http://localhost:5000/movies/pfs", data)
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
        "http://localhost:5000/movies",
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
      .delete(`http://localhost:5000/movies/${id}`, {
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
        `http://localhost:5000/movies/${movie._id}`,
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
        `http://localhost:5000/movies/${id}`,
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
      .post("http://localhost:5000/movies/count", data)
      .then((response) => {
        dispatch({
          type: COUNT_MOVIE,
          count: response.data,
        });
      })
      .catch((err) => console.log(err.message));
  };
};
