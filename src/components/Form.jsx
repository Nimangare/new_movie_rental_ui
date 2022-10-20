import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const genreSchema = yup.object().shape({
  name: yup.string().min(3).max(50).required(),
});
const Form = () => {
  const location = useLocation();
  const name = location.state.name;
  const [formValue, setFormValue] = useState("");
  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(genreSchema),
  });

  const onSubmitHandler = (data) => {
    console.log(data.name);
    console.log(name);
  };
  return (
    <form
      className="card form mx-auto my-5"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">
          Genre_Name
        </span>
        <input
          //   value=""
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          {...register("name")}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
