import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { addGenre, getCurrentGenre, updateGenre } from "../actions/genreAction";

export const genreLoader = ({ params }) => {
  const genreId = params.genreId;
  return genreId;
};

const genreSchema = yup.object().shape({
  name: yup.string().required().min(3).max(50),
});

const GenreForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genre = useSelector((state) => state.genreReducer.genre);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(genreSchema),
  });
  const genreId = useLoaderData();

  useEffect(() => {
    if (!genreId) return;
    dispatch(getCurrentGenre(genreId));
    setValue("name", genre.name);
    setValue("_id", genre._id);
  }, [genre._id]);

  const onSubmitHandler = (data) => {
    if (data._id) {
      console.log("update");
      console.log(data);
      dispatch(updateGenre(data));
    } else {
      console.log("add");
      data._id = uuidV4();
      console.log(data);
      dispatch(addGenre(data));
    }

    navigate("/genres");
  };
  return (
    <React.Fragment>
      <form
        className="card form mx-auto my-5 bg-light shadow-sm"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="input-group mb-3">
          {/* <span className="input-group-text" id="inputGroup-sizing-default">
            Genre_Name
          </span> */}
          <input
            type="text"
            className={`  form-control m-3 ${
              errors.name ? "border-danger" : ""
            }`}
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            {...register("name")}
          />
        </div>
        <h5 className=" text-danger m-3">{errors.name?.message}</h5>
        <button type="submit" className="btn btn-primary m-3">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default GenreForm;
