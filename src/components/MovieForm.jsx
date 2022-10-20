import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";
import {
  addMovie,
  filterMovie,
  getCurrentMovie,
  updatemovie,
} from "../actions/movieAction";
import { getAllgenres } from "../actions/genreAction";

export const movieLoader = ({ params }) => {
  const movieId = params.movieId;

  return movieId;
};

const movieSchema = yup.object().shape({
  title: yup.string().min(5).max(10).required(),
  genre: yup.string().required(),
  dailyRentalRate: yup.number().min(0).max(10).required(),
  numberInStock: yup.number().min(0).max(50).required(),
  isLiked: yup.boolean().default(false),
});

const MovieForm = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genreReducer.genres);
  const movie = useSelector((state) => state.movieReducer.currentMovie);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(movieSchema),
  });
  const movieId = useLoaderData();

  useEffect(() => {
    dispatch(getAllgenres());
  }, []);
  useEffect(() => {
    if (!movieId) return;
    dispatch(getCurrentMovie(movieId));
    setValue("title", movie.title);
    setValue("genre", movie.genre?.name);
    setValue("dailyRentalRate", movie.dailyRentalRate);
    setValue("numberInStock", movie.numberInStock);
    setValue("liked", movie.liked);
    setValue("_id", movie._id);
  }, [movie.genre?._id]);

  const onSubmitHandler = (data) => {
    console.log(data);
    
    if (data._id) {
      const genre = genres.find((genre) => genre.name === data.genre);
      data.genre = genre._id;
      dispatch(updatemovie(data));
      navigate("/movies");
    } else {
      const genre = genres.find((genre) => genre.name === data.genre);
      data.genre = genre._id;
      dispatch(addMovie(data));
      navigate("/movies");
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
            id="title"
            placeholder="title"
            {...register("title")}
          />
          <label htmlFor="title">Title</label>
        </div>
        <p>{errors.title?.message}</p>
        <div className="form-floating m-3">
          <select
            className="form-select"
            aria-label="Default select example"
            {...register("genre")}
          >
            {" "}
            <option value="">select genres</option>
            {genres.map((genre) => {
              return (
                <option value={genre.name} key={genre._id}>
                  {genre.name}
                </option>
              );
            })}
          </select>
          <label htmlFor="genre">Genre</label>
        </div>
        <p>{errors.genre?.message}</p>
        <div className="form-floating m-3">
          <input
            type="number"
            className="form-control  "
            id="dailyRentalRate"
            placeholder="dailyRentalRate"
            {...register("dailyRentalRate")}
          />
          <label htmlFor="dailyRentalRate">dailyRentalRate</label>
        </div>
        <p>{errors.dailyRentalRate?.message}</p>
        <div className="form-floating m-3">
          <input
            type="number"
            className="form-control "
            id="numberInStock"
            placeholder="numberInStock"
            {...register("numberInStock")}
          />
          <label htmlFor="numberInStock">numberInStock</label>
        </div>
        <p>{errors.numberInStock?.message}</p>
        <div className="form-check m-3">
          <input
            {...register("liked")}
            className="form-check-input  "
            type="checkbox"
            value=""
            id="isLiked"
          />
          <label className="form-check-label" htmlFor="isLiked">
            isLiked
          </label>
        </div>

        <p>{errors.liked?.message}</p>
        <button type="submit" className="btn btn-primary m-3">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default MovieForm;
