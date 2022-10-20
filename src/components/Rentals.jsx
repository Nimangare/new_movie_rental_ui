import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRental,
  getAllRentals,
  patchRental,
} from "../actions/rentalAction";
import { getAllMovies } from "../actions/movieAction";
import { Link } from "react-router-dom";
const Rental = () => {
  const rentals = useSelector((state) => state.rentalReducer.rentals);
  const movies = useSelector((state) => state.movieReducer.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
    dispatch(getAllRentals());
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteRental(id));
  };

  const handlePatch = (id) => {
    console.log(id);
    dispatch(patchRental(id));
  };
  return (
    <React.Fragment>
      <h2>Rentals</h2>
      <div className="row">
        <div className="col-3">
          <Link to="/rentals/new">
            <button type="button" className="btn btn-primary m-5">
              Add Rental
            </button>
          </Link>
        </div>
        <div className="col">
          {rentals.length < 1 ? (
            <p>Rentals is Empty</p>
          ) : (
            <table className="table table-bordered">
              <thead className="bg-light shadow-sm">
                <tr className="text-center ps-4">
                  <th>Customer</th>
                  <th>Movie</th>
                  <th>rentalFee</th>
                  <th>dateOut</th>
                  <th>dateIn</th>
                  <th>Remove Rental</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {rentals.map((rental, index) => {
                  return (
                    <tr key={index}>
                      <td>{rental.customer.name}</td>
                      <td>{rental.movie.title}</td>
                      <td>{rental.rentalFee}</td>
                      <td>{new Date(rental.dateOut).toDateString()}</td>
                      <td>
                        {rental.dateIn
                          ? new Date(parseInt(rental.dateIn)).toDateString()
                          : "NA"}
                      </td>

                      <td>
                        <div>
                          <button
                            className="btn btn-success m-1"
                            onClick={() => handlePatch(rental._id)}
                          >
                            Update
                          </button>

                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(rental._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Rental;
