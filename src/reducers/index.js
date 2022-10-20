import { combineReducers } from "redux";

import { genreReducer } from "./genreReducer";
// import genreReducer from "../slices/genreSlice";
import customerReducer from "./customerReducer";
import movieReducer from "./movieReducer";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
// import loginReducer from "../slices/logIn";
import { rentalReducer } from "./rentalReducer";

export default combineReducers({
  genreReducer,
  customerReducer,
  movieReducer,
  registerReducer,
  loginReducer,
  rentalReducer,
});
