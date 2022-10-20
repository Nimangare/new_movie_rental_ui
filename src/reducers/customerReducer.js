import { getCustomers } from "../services/fakeCustomerService";
import {
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  GET_ALL_CUSTOMERS,
  UPDATE_CUSTOMER,
} from "../actions/types";

const customerReducer = (state = { customers: [] }, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMERS: {
      return {
        customers: [...action.customers],
      };
    }
    case ADD_CUSTOMER: {
      return {
        customers: [...state.customers, action.customer],
      };
    }
    case DELETE_CUSTOMER: {
      return {
        customers: state.customers.filter(
          (customer) => customer._id !== action.id
        ),
      };
    }
    case UPDATE_CUSTOMER: {
      return {
        customers: state.customers.map((customer) => {
          if (customer._id === action.data._id) {
            customer = action.data;
          }
          return customer;
        }),
      };
    }
    default:
      return state;
  }
};

export default customerReducer;
