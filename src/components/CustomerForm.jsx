import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import React, { useEffect } from "react";

import customerReducer from "../reducers/customerReducer";
import { useDispatch, useSelector } from "react-redux";

import { addCustomer, updateCustomer } from "../actions/customerAction";
export const customerLoader = ({ params }) => {
  const customerId = params.customerId;
  // console.log(customerId);
  return customerId;
};

const customerSchema = yup.object().shape({
  name: yup.string().required().min(5).max(50),
  phone: yup.string().required().min(7).max(10),
  isGold: yup.boolean().default(false),
});

const CustomerForm = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customerReducer.customers);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(customerSchema),
  });
  const customerId = useLoaderData();

  useEffect(() => {
    if (!customerId) return;
    const customer = customers.find((customer) => {
      return customer._id === customerId;
    });
    // console.log(customer);
    setValue("_id", customer._id);
    setValue("name", customer.name);
    setValue("phone", customer.phone);
    setValue("isGold", customer.isGold);
  }, []);

  const onSubmitHandler = (data) => {
    if (data._id) {
      dispatch(updateCustomer(data));
      navigate("../../customers");
    } else {
      dispatch(addCustomer(data));
      navigate("../../customers");
    }
  };
  return (
    <React.Fragment>
      <form
        className="card form mx-auto my-5 bg-light shadow-sm"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="form-floating m-3">
          <input
            type="text"
            className="form-control   "
            id="name"
            placeholder="name"
            {...register("name")}
          />
          <label htmlFor="name">Name</label>
        </div>
        <p>{errors.name?.message}</p>
        <div className="form-floating m-3">
          <input
            type="text"
            className="form-control "
            id="phone"
            placeholder="Phone"
            {...register("phone")}
          />
          <label htmlFor="phone">Phone</label>
        </div>
        <p>{errors.phone?.message}</p>

        <div className="form-check m-3 ">
          <input
            {...register("isGold")}
            className="form-check-input   "
            type="checkbox"
            value=""
            id="isGold"
          />
          <label className="form-check-label" htmlFor="isGold">
            isGold
          </label>
        </div>

        <p>{errors.isLiked?.message}</p>
        <button type="submit" className="btn btn-primary m-3 ">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default CustomerForm;
