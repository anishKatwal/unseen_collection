import { createUser, updateUser } from "../../api/user";
import { EMAIL_REGEX } from "../../constants/regex";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { ROLE_EMPLOYEE, ROLE_USER } from "../../constants/userRoles";
import { STAFF_LIST_ROUTE } from "../../constants/routes";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Spinner from "../../components/Spinner";

const UserForm = ({ user, isEditing = false }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState, watch } = useForm({
    mode: "all",
    values: user,
  });

  const password = watch("password");

  const { errors } = formState;

  const navigate = useNavigate();

  async function submitForm(data) {
    setLoading(true);

    if (!password) delete data.password;

    try {
      isEditing
        ? await updateUser(user.id, data)
        : await createUser({ ...data, roles: [ROLE_EMPLOYEE, ROLE_USER] });

      toast.success(`Staff ${isEditing ? "updated" : "created"} successfully`, {
        autoClose: 500,
        onClose: () => navigate(STAFF_LIST_ROUTE),
      });
    } catch (error) {
      toast.error(error.response?.message, {
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} noValidate className="pb-5">
      <div className="py-1">
        <label htmlFor="name" className="ml-1">
          Name
        </label>
        <input
          type="text"
          className="border w-full mt-2 px-3 py-2 rounded"
          {...register("name", {
            required: "Name is required.",
          })}
        />
        <p className="text-red-500 mt-2 ml-1">{errors.name?.message}</p>
      </div>

      <div className="py-1">
        <label htmlFor="email" className="ml-1">
          Email
        </label>
        <input
          type="email"
          className="border w-full mt-2 px-3 py-2 rounded disabled:bg-slate-100 disabled:text-gray-600"
          disabled={isEditing}
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: EMAIL_REGEX,
              message: "Invalid email address.",
            },
          })}
        />
        <p className="text-red-500 mt-2 ml-1">{errors.email?.message}</p>
      </div>

      <div className="py-1">
        <label htmlFor="address" className="ml-1">
          Address
        </label>
        <input
          type="text"
          className="border w-full mt-2 px-3 py-2 rounded"
          {...register("address", {
            required: "Address is required.",
          })}
        />
        <p className="text-red-500 mt-2 ml-1">{errors.address?.message}</p>
      </div>

      <div className="py-1">
        <label htmlFor="name" className="ml-1">
          Phone number
        </label>
        <input
          type="text"
          className="border w-full mt-2 px-3 py-2 rounded"
          {...register("phone", {
            required: "Phone number is required.",
          })}
        />
        <p className="text-red-500 mt-2 ml-1">{errors.phone?.message}</p>
      </div>

      <div className="py-1">
        <label htmlFor="password" className="ml-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="border w-full mt-2 px-3 py-2 rounded"
            {...register("password", {
              required: {
                value: !isEditing,
                message: "Password is required.",
              },
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
        <p className="text-red-500 mt-2 ml-1">{errors.password?.message}</p>
      </div>

      <div className="py-1">
        <label htmlFor="confirmPassword" className="ml-1">
          Confirm Password
        </label>
        <input
          type="password"
          className="border w-full mt-2 px-3 py-2 rounded"
          {...register("confirmPassword", {
            required: {
              value: !isEditing,
              message: "Confirm password is required.",
            },
            validate: (value) => {
              return value == password || "Passwords do not match.";
            },
          })}
        />
        <p className="text-red-500 mt-2 ml-1">
          {errors.confirmPassword?.message}
        </p>
      </div>

      <div className="mt-5 text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white rounded py-2 hover:bg-blue-600 cursor-pointer w-full flex justify-center items-center"
        >
          <span className="mr-2">{isEditing ? "Update" : "Create"}</span>
          {loading ? <Spinner /> : null}
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default UserForm;
