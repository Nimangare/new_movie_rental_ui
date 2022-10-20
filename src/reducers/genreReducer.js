import {
  ADD_GENRE,
  COUNT_GENRE,
  DELETE_GENRE,
  GET_ALL_GENRES,
  GET_CURRENT_GENRE,
  GET_PFS_GENRES,
  UPDATE_GENRE,
} from "../actions/types";

export const genreReducer = (
  state = { genres: [], count: 0, genre: {} },
  action
) => {
  switch (action.type) {
    case GET_ALL_GENRES:
      
      return {
        ...state,
        genres: action.genres,
      };
    case GET_CURRENT_GENRE:
      return {
        ...state,
        genre: action.genre,
      };
    case COUNT_GENRE:
      return {
        ...state,
        count: +action.count,
      };
    case GET_PFS_GENRES:
      return {
        ...state,
        genres: [...action.genres],
      };
    case ADD_GENRE:
      return {
        ...state,
        genres: [...state.genres, action.genre],
      };

    case DELETE_GENRE:
      const genres = state.genres.filter((genre) => genre._id !== action.id);
      return {
        ...state,
        genres,
      };

    case UPDATE_GENRE: {
      const genres = state.genres.map((genre) => {
        if (genre._id === action.data._id) {
          genre = action.data;
        }
        return genre;
      });
      return {
        ...state,
        genres,
      };
    }
    default:
      return state;
  }
};
