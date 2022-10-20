import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  genres: [],
  count: 0,
  currentGenre: {},
};
const genreSlice = createSlice({
  name: "genre",
  initialState: {},
  reducers: {
    getALL: (state, action) => {
      state.genres = action.payload;
    },
    getCurrent: (state, action) => {
      state.genres = action.payload;
    },
    add: (state, action) => {
      state.genres.push(action.payload);
    },
    remove: (state, action) => {
      state.genres.filter((genre) => genre._id !== action.payload);
    },
    update: (state, action) => {
      return state.genres.map((genre) => {
        if (genre._id === action.payload._id) {
          genre = action.payload;
        }
        return genre;
      });
    },
  },
});

export default genreSlice.reducer;
export const { getALL, add, update, remove } = genreSlice.actions;

// redux-thunk
export const getAllgenres = () => {
  return (dispatch, getState) => {
    axios
      .get("http://localhost:5000/genres")
      .then((response) => dispatch(getALL(response.data)))
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
        dispatch(add(response.data));
      })
      .catch((err) => {
        console.log(err.message);
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
        dispatch(update(response.data));
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
        dispatch(remove(response.data._id));
      });
  };
};
