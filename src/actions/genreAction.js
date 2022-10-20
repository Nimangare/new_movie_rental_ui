import {
  ADD_GENRE,
  DELETE_GENRE,
  GET_ALL_GENRES,
  GET_CURRENT_GENRE,
  UPDATE_GENRE,
  COUNT_GENRE,
  GET_PFS_GENRES,
} from "./types";
import axios from "axios";
const API_Endpoint = process.env.RECAT_APP_API_URL;
export const getAllgenres = () => {
  return (dispatch, getState) => {
    axios
      .get("genres")
      .then((response) =>
        dispatch({ type: GET_ALL_GENRES, genres: response.data })
      )
      .catch((err) => console.log(err.message));
  };
};

export const getCurrentGenre = (id) => {
  return (dispatch, getState) => {
    axios
      .get(`http://localhost:5000/genres/${id}`)
      .then((response) => {
        dispatch({ type: GET_CURRENT_GENRE, genre: response.data });
      })
      .catch((err) => console.log(err.message));
  };
};

export const addGenre = (genre) => {
  return (dispatch, getState) => {
    axios
      .post(
        "http://localhost:5000/genres",
        { name: genre.name },
        {
          headers: {
            "x-auth-token": getState().loginReducer.token,
          },
        }
      )
      .then((response) => {
        dispatch({ type: ADD_GENRE, genre: response.data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const deleteGenre = (id) => {
  return (dispatch, getState) => {
    axios
      .delete(`http://localhost:5000/genres/${id}`, {
        headers: {
          "x-auth-token": getState().loginReducer.token,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch({ type: DELETE_GENRE, id: response.data._id });
      });
  };
};

export const updateGenre = (data) => {
  return (dispatch, getState) => {
    console.log(data);
    axios
      .put(
        `http://localhost:5000/genres/${data._id}`,
        { name: data.name },
        {
          headers: {
            "x-auth-token": getState().loginReducer.token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch({ type: UPDATE_GENRE, data: response.data });
      });
  };
};

export const countGenre = (data) => {
  return (dispatch, getState) => {
    axios
      .post("http://localhost:5000/count", data)
      .then((response) =>
        dispatch({
          type: COUNT_GENRE,
          count: response.data,
        })
      )
      .catch((err) => console.log(err.message));
  };
};

export const getPFSGenres = (data) => {
  return (dispatch, getState) => {
    axios
      .post("http://localhost:5000/genres/pfs", data)
      .then((response) => {
        // console.log(response.data);
        dispatch({ type: GET_PFS_GENRES, genres: response.data });
      })
      .catch((err) => console.log(err.message));
  };
};
