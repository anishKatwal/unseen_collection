import { getUserById, updateUser } from "../../api/user";
import { toast, ToastContainer } from "react-toastify";
import { updateAuthUser } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Spinner from "../../components/Spinner";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
    },
  });

  async function submitForm(data) {
    setLoading(true);

    try {
      await updateUser(user.id, {
        address: data.address,
        phone: data.phone,
        name: data.name,
      });

      const userData = await getUserById(user.id);

      dispatch(updateAuthUser(userData));

      toast.success("User update successful.", {
        autoClose: 1500,
      });
    } catch (error) {
      toast.error(error?.response?.data, {
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-10 bg-slate-100 min-h-svh  px-4 lg:px-6">
      <div className="sm:w-3/5 lg:min-h-[70vh] rounded-xl shadow-md mx-auto py-8 px-12 bg-white">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-textColor">
          Your profile
        </h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="py-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 rounded px-3 py-1 w-full shadow-md mt-1  "
              {...register("name", {
                required: "Name is required.",
              })}
            />
            <p className="text-red-600 text-sm m-1">{errors.name?.message}</p>
          </div>
          <div className="py-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              disabled={true}
              className="disabled:bg-slate-100 disabled:opacity-80 border border-gray-300 rounded px-3 py-1 w-full shadow-md mt-1  "
              {...register("email", {
                required: "Email is required.",
              })}
            />
            <p className="text-red-600 text-sm m-1">{errors.name?.message}</p>
          </div>
          <div className="py-2">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              className="border border-gray-300 rounded px-3 py-1 w-full shadow-md mt-1  "
              {...register("address", {
                required: "Address is required.",
              })}
            />
            <p className="text-red-600 text-sm m-1">
              {errors.address?.message}
            </p>
          </div>
          <div className="py-2">
            <label htmlFor="phone">Phone number</label>
            <input
              type="text"
              id="phone"
              className="border border-gray-300 rounded px-3 py-1 w-full shadow-md mt-1  "
              {...register("phone", {
                required: "Phone number is required.",
              })}
            />
            <p className="text-red-600 text-sm m-1">{errors.phone?.message}</p>
          </div>
          <div className="pt-5 flex justify-center">
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-600 text-white px-10 h-10 rounded cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center disabled:bg-opacity-80"
            >
              {loading ? (
                <>
                  <span>Updating</span>
                  <Spinner className="h-6 w-6 ml-2" />
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </section>
  );
};

export default ProfilePage;
