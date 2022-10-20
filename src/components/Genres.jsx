import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  countGenre,
  deleteGenre,
  getAllgenres,
  getPFSGenres,
} from "../actions/genreAction";
// import {
//   addGenre,
//   deleteGenre,
//   updateGenre,
//   getAllgenres,
// } from "../slices/genreSlice";
import Pagination from "./common/Pagination";
const Genre = () => {
  const genres = useSelector((state) => state.genreReducer.genres);
  const totalNoOfGenres = useSelector((state) => state.genreReducer.count);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllgenres());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteGenre(id));
  };

  return (
    <React.Fragment>
      {/* <h2>Genres</h2> */}
      <div className="row mt-4">
        <div className="col-5">
          <Link to="/genres/new">
            <button type="button" className="btn btn-primary m-5">
              Add Genre
            </button>
          </Link>
        </div>

        <div className="col pe-5">
          {genres.length < 1 ? (
            <p>Genres is Empty</p>
          ) : (
            <table className="table table-bordered ">
              <thead className="bg-light shadow-sm">
                <tr>
                  <th className="w-75 ps-4">Name</th>
                  <th className="text-center">Remove Genre</th>
                </tr>
              </thead>
              <tbody>
                {genres.map((genre, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link
                          to={{
                            pathname: `/genres/${genre._id}`,
                          }}
                        >
                          <button className="btn">{genre.name}</button>
                        </Link>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger "
                          onClick={() => handleDelete(genre._id)}
                        >
                          {" "}
                          Delete
                        </button>
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
export default Genre;
