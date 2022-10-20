import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRental, getAllRentals } from "../actions/rentalAction";
import { getAllMovies } from "../actions/movieAction";
import { getAllCustomers } from "../actions/customerAction";

export const rentalLoader = ({ params }) => {
  const rentalId = params.rentalId;
  return rentalId;
};
const rentalSchema = yup.object().shape({
  customer: yup.string(),
  movie: yup.string(),
  rentalFee: yup.number(),
  dateOut: yup.date(),
  dateIn: yup.date(),
});

const RentalForm = () => {
  const rentals = useSelector((state) => state.rentalReducer.rentals);
  const movies = useSelector((state) => state.movieReducer.movies);
  const customers = useSelector((state) => state.customerReducer.customers);

  const dispatch = useDispatch();
  const rentalId = useLoaderData();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(rentalSchema),
  });
  useEffect(() => {
    dispatch(getAllRentals());
    dispatch(getAllMovies());
    dispatch(getAllCustomers());

    if (!rentalId) return;
    else {
      const rental = rentals.find((rental) => rental._id === rentalId);
      const movie = movies.find((movie) => movie._id === rental.movie);
      setValue("customer", rental.customer.name);
      setValue("movie", rental.movie.title);
      setValue("rentalFee", rental.rentalFee);
      setValue("dateOut", rental.dateOut);
      setValue("dateIn", rental.dateIn);
      setValue("_id", rental._id);
    }
  }, []);

  const onSubmit = (data) => {
    console.log(data);

    if (data._id) {
      console.log("update");
    } else {
      console.log("add");
      dispatch(addRental(data));
      navigate("../../rentals");
    }
  };
  return (
    <React.Fragment>
      <h2>RentalForm</h2>
      <form
        className="card form mx-auto my-4 bg-light shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-floating my-2 m-3 my-2 mt-3">
          <select
            className="form-select"
            aria-label="Default select example"
            {...register("customer")}
          >
            {customers.map((customer) => {
              return (
                <option value={customer._id} key={customer._id}>
                  {customer.name}
                </option>
              );
            })}
          </select>
          <label htmlFor="customer">customer</label>
        </div>
        <p>{errors.customer?.message}</p>

        <div className="form-floating my-2 m-3">
          <select
            className="form-select"
            aria-label="Default select example"
            {...register("movie")}
          >
            {movies.map((movie) => {
              return (
                <option value={movie._id} key={movie._id}>
                  {movie.title}
                </option>
              );
            })}
          </select>
          <label htmlFor="movie">movie</label>
        </div>
        <p>{errors.movie?.message}</p>

        {/* <div className="form-floating my-2 m-3">
          <input
            type="number"
            className="form-control  "
            id="rentalFee"
            placeholder="rentalFee"
            {...register("rentalFee")}
          />
          <label htmlFor="rentalFee">rentalFee</label>
        </div>
        <p>{errors.rentalFee?.message}</p> */}
        {/* 
        <div className="form-floating my-2 m-3">
          <input
            type="date"
            className="form-control  "
            id="dateOut"
            placeholder="dateOut"
            {...register("dateOut")}
          />
          <label htmlFor="dateOut">dateOut</label>
        </div>
        <p>{errors.dateOut?.message}</p>

        <div className="form-floating my-2 m-3">
          <input
            type="date"
            className="form-control  "
            id="dateIn"
            placeholder="dateIn"
            {...register("dateIn")}
          />
          <label htmlFor="dateIn">dateIn</label>
        </div>
        <p>{errors.dateIn?.message}</p> */}

        <button type="submit" className="btn btn-primary my-2 m-3">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default RentalForm;
