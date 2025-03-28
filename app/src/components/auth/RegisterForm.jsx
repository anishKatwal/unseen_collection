import { EMAIL_REGEX } from "../../constants/regex";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { registerUser } from "../../redux/auth/authActions";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../Spinner";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState, watch } = useForm({ mode: "all" });

  const password = watch("password");

  const { errors } = formState;

  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.auth);

  function submitForm(data) {
    dispatch(registerUser(data));
  }

  useEffect(() => {
    if (user) {
      toast.success("User registered successfully", { autoClose: 2500 });
    }

    if (error) {
      toast.error(error, { autoClose: 2500 });
    }
  }, [error, user]);

  return (
    <form onSubmit={handleSubmit(submitForm)} noValidate className="w-4/6">
      <div className="py-1">
        <label htmlFor="name" className="ml-1 font-semibold text-sm">
          Name
        </label>
        <input
          type="text"
          className="border w-full mt-2 px-3 py-2 rounded"
          {...register("name", {
            required: "Name is required.",
          })}
        />
        <p className="text-red-500 text-sm mt-2 ml-1">{errors.name?.message}</p>
      </div>

      <div className="py-1">
        <label htmlFor="email" className="ml-1 font-semibold text-sm">
          Email
        </label>
        <input
          type="email"
          className="border w-full mt-2 px-3 py-2 rounded"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: EMAIL_REGEX,
              message: "Invalid email address.",
            },
          })}
        />
        <p className="text-red-500 text-sm mt-2 ml-1">
          {errors.email?.message}
        </p>
      </div>

      <div className="py-1">
        <label htmlFor="address" className="ml-1 font-semibold text-sm">
          Address
        </label>
        <input
          type="text"
          className="border w-full mt-2 px-3 py-2 rounded"
          {...register("address", {
            required: "Address is required.",
          })}
        />
        <p className="text-red-500 text-sm mt-2 ml-1">
          {errors.address?.message}
        </p>
      </div>

      <div className="py-1">
        <label htmlFor="name" className="ml-1 font-semibold text-sm">
          Phone number
        </label>
        <input
          type="text"
          className="border w-full mt-2 px-3 py-2 rounded"
          {...register("phone", {
            required: "Phone number is required.",
          })}
        />
        <p className="text-red-500 text-sm mt-2 ml-1">
          {errors.phone?.message}
        </p>
      </div>

      <div className="py-1">
        <label htmlFor="password" className="ml-1 font-semibold text-sm">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="border w-full mt-2 px-3 py-2 rounded"
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password length must be greater than 6.",
              },
            })}
          />
          <span
            className="absolute right-3 top-5 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </span>
        </div>
        <p className="text-red-500 text-sm mt-2 ml-1">
          {errors.password?.message}
        </p>
      </div>

      <div className="py-1">
        <label htmlFor="confirmPassword" className="ml-1 font-semibold text-sm">
          Confirm Password
        </label>
        <input
          type="password"
          className="border w-full mt-2 px-3 py-2 rounded"
          {...register("confirmPassword", {
            required: "Confirm password is required.",
            validate: (value) => {
              return value == password || "Passwords do not match.";
            },
          })}
        />
        <p className="text-red-500 text-sm mt-2 ml-1">
          {errors.confirmPassword?.message}
        </p>
      </div>

      <div className="mt-5 text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 hover:bg-blue-600 cursor-pointer w-full flex justify-center items-center"
        >
          <span className="mr-2">Register</span>
          {loading ? <Spinner /> : null}
        </button>
      </div>
      <div className="text-center mt-5 text-sm">
        <span>Already have an account?</span>
        <Link to="/auth/login" className="ml-1 text-blue-500">
          Login
        </Link>
      </div>

      <ToastContainer />
    </form>
  );
};

export default RegisterForm;
