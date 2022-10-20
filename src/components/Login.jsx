import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { logInUser } from "../actions/logInAction";
import { loginThunk } from "../slices/logIn";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});
const FormValidation = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data) => {
    // dispatch(logInUser(data));
    dispatch(loginThunk(data));
  };
  return (
    <div>
      <form
        className="card form mx-auto my-5 p-4 bg-light"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h2 className="text-center mb-4">Sign In</h2>
        {/* <br /> */}

        <div className="input-group mb-4">
          <input
            placeholder="email"
            type="email"
            required
            {...register("email")}
            className="form-control "
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>

        {/* <p>{errors.email?.message}</p>
        <br /> */}

        <div className="input-group mb-4">
          <input
            placeholder="password"
            type="password"
            required
            {...register("password")}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>

        {/* <p>{errors.password?.message}</p>
        <br /> */}

        <button type="submit" className="btn btn-primary mt-3">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default FormValidation;
