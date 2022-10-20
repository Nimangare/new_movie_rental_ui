import { number } from "yup";
import {
  ADD_MOVIE,
  COUNT_MOVIE,
  DELETE_MOVIE,
  FILTER_MOVIE,
  GET_ALL_MOVIES,
  GET_CURRENT_MOVIE,
  GET_PFS,
  TOGGLE_LIKED,
  UPDATE_MOVIE,
} from "../actions/types";

const movieReducer = (
  state = { movies: [], count: 0, currentMovie: {} },
  action
) => {
  switch (action.type) {
    case GET_ALL_MOVIES:
      // console.log(action);
      return {
        ...state,
        movies: action.movies,
      };

    case GET_CURRENT_MOVIE:
      return {
        ...state,
        currentMovie: action.movie,
      };
    case ADD_MOVIE:
      return {
        ...state,
        currentMovie: action.movie,
      };
    case UPDATE_MOVIE:
      const updatedMovies = state.movies.map((m) => {
        if (m._id === action.movie._id) {
          m = action.movie;
        }
        return m;
      });
      return { ...state, movies: updatedMovies };

    case DELETE_MOVIE:
      return {
        ...state,
        movies: [...state.movies.filter((movie) => movie._id !== action.id)],
      };

    case TOGGLE_LIKED:
      state.movies = state.movies.map((movie) => {
        if (movie._id === action.movie._id) {
          movie.liked = action.movie.liked;
        }
        return movie;
      });
      return {
        ...state,
        movies: state.movies,
      };

    case COUNT_MOVIE:
      return {
        ...state,
        count: +action.count,
      };

    case GET_PFS:
      // console.log(action.movies);
      return {
        ...state,
        movies: action.movies,
      };
    default:
      return state;
  }
};

export default movieReducer;
