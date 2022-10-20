import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../actions/registerAction";

const schema = yup.object().shape({
  name: yup.string().min(5).max(50).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  isAdmin: yup.boolean(),
});
const Register = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitHandler = (data) => {
    // console.log(data);
    dispatch(registerUser(data));
  };
  return (
    <div>
      <form
        className="card form mx-auto my-5 p-3 bg-light "
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h2 className="text-center mb-4">Register Yourself</h2>

        <div className="input-group mb-4  ">
          <input
            placeholder="Name"
            type="text"
            required
            {...register("name")}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
        <div className="input-group mb-4">
          <input
            placeholder="email"
            type="email"
            required
            {...register("email")}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>

        <p>{errors.email?.message}</p>

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

        <p>{errors.password?.message}</p>
        <br />

        <div className="form-check mb-5">
          <input
            {...register("isAdmin")}
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            isAdmin
          </label>
        </div>

        <button type="submit" className="btn btn-primary mt-1">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
