import {
  ADD_RENTAL,
  DELETE_RENTAL,
  GET_ALL_RENTALS,
  UPDATE_RENTAL,
} from "../actions/types";

export const rentalReducer = (state = { rentals: [] }, action) => {
  switch (action.type) {
    case GET_ALL_RENTALS:
      return {
        rentals: [...action.rentals],
      };
    case ADD_RENTAL:
      return {
        rentals: [...state.rentals, action.rental],
      };
    case DELETE_RENTAL:
      return {
        rentals: [
          ...state.rentals.filter((rental) => rental._id !== action.id),
        ],
      };
    case UPDATE_RENTAL:
      state.rentals = state.rentals.map((rental) => {
        if (rental._id === action.rental._id) {
          rental.dateIn = action.rental.dateIn;
        }
        return rental;
      });
      return {
        rentals: state.rentals,
      };

    default:
      return state;
  }
};
