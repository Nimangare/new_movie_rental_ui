import {
  ADD_CUSTOMER,
  DELETE_CUSTOMER,
  GET_ALL_CUSTOMERS,
  UPDATE_CUSTOMER,
} from "./types";
import axios from "axios";
const API_Endpoint = process.env.REACT_APP_API_URL;

export const getAllCustomers = () => {
  return (dispatch, getState) => {
    axios
      .get(API_Endpoint + "customers")
      .then((response) => {
        dispatch({ type: GET_ALL_CUSTOMERS, customers: response.data });
      })
      .catch((err) => console.log(err.message));
  };
};

export const addCustomer = (customer) => {
  return (dispatch, getState) => {
    axios
      .post(
        API_Endpoint + "customers",
        { name: customer.name, phone: customer.phone, isGold: customer.isGold },
        {
          headers: {
            "x-auth-token": getState().loginReducer.token,
          },
        }
      )
      .then((response) => {
        dispatch({ type: ADD_CUSTOMER, customer: response.data });
      })
      .catch((err) => console.log(err.message));
  };
};

export const deleteCustomer = (id) => {
  return (dispatch, getState) => {
    axios
      .delete(API_Endpoint + `customers/${id}`, {
        headers: {
          "x-auth-token": getState().loginReducer.token,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch({ type: DELETE_CUSTOMER, id: response.data._id });
      });
  };
};

export const updateCustomer = (data) => {
  return (dispatch, getState) => {
    console.log(data);
    axios
      .put(
        API_Endpoint + `customers/${data._id}`,
        { name: data.name, phone: data.phone, isGold: data.isGold },
        {
          headers: {
            "x-auth-token": getState().loginReducer.token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch({ type: UPDATE_CUSTOMER, data: response.data });
      });
  };
};
