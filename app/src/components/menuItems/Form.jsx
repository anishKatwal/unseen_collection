import { addMenuItem, editMenuItem } from "../../api/menuItem";
import { MENU_ITEM_LIST_ROUTE } from "../../constants/routes";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MenuItemForm({ isEditing = false, menuItem }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: menuItem,
  });

  const [loading, setLoading] = useState(false);
  const [menuItemImages, setMenuItemImages] = useState([]);
  const [localImageUrls, setLocalImageUrls] = useState([]);

  const navigate = useNavigate();

  async function submitForm(data) {
    setLoading(true);

    const formData = new FormData();
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    menuItemImages.map((image) => {
      formData.append("images", image);
    });

    try {
      isEditing
        ? await editMenuItem(menuItem.id, data)
        : await addMenuItem(formData);

      toast.success(
        isEditing
          ? "Menu item updated successfully."
          : "Menu item added successfully.",
        {
          autoClose: 500,
          onClose: () => navigate(MENU_ITEM_LIST_ROUTE),
        }
      );
    } catch (error) {
      toast.error(error.response.data, {
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="w-full px-10 py-8 md:px-12 shadow-xl rounded-2xl bg-white mt-5 mb-10"
    >
      <div className="py-2">
        <label htmlFor="name" className="font-semibold text-sm uppercase p-1 ">
          Item name
        </label>
        <input
          type="text"
          id="name"
          className="border border-gray-500 rounded px-3 py-1 w-full shadow-md mt-1"
          {...register("name", {
            required: "Menu item name is required.",
          })}
        />
        <p className="text-red-600 text-sm m-1">{errors.name?.message}</p>
      </div>
      <div className="py-2">
        <label
          htmlFor="category"
          className="font-semibold text-sm uppercase p-1"
        >
          Category
        </label>
        <input
          type="text"
          id="category"
          className="border border-gray-500 rounded px-3 py-1 w-full shadow-md mt-1"
          {...register("category", {
            required: "Category is required.",
          })}
        />
        <p className="text-red-600 text-sm m-1">{errors.category?.message}</p>
      </div>
      <div className="py-2">
        <label htmlFor="price" className="font-semibold text-sm uppercase p-1">
          Price
        </label>
        <input
          type="number"
          id="price"
          min={0}
          className="border border-gray-500 rounded px-3 py-1 w-full shadow-md mt-1"
          {...register("price", {
            required: "Price is required.",
          })}
        />
        <p className="text-red-600 text-sm m-1">{errors.price?.message}</p>
      </div>

      <div className="py-2">
        <label
          htmlFor="isActive"
          className="font-semibold text-sm uppercase p-1"
        >
          Status
        </label>
        <select
          id="isActive"
          className="border border-gray-500 rounded px-3 py-1 w-full shadow-md mt-1"
          {...register("isActive")}
        >
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>
      </div>

      <div className="py-2">
        <label
          htmlFor="description"
          className="font-semibold text-sm uppercase p-1"
        >
          Description
        </label>
        <textarea
          id="description"
          className="border border-gray-500 rounded px-3 py-1 w-full shadow-md mt-1"
          {...register("description")}
        ></textarea>

        <p className="text-red-600 text-sm m-1">{errors.stock?.message}</p>
      </div>

      {!isEditing && (
        <div className="py-2">
          <label
            htmlFor="images"
            className="font-semibold text-sm uppercase p-1"
          >
            Images
          </label>

          {localImageUrls.length > 0 && (
            <div className="p-5 bg-gray-100 my-1 rounded grid grid-cols-2 gap-3 items-center justify-evenly">
              {localImageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt="image"
                  height={200}
                  width={200}
                />
              ))}
            </div>
          )}

          <input
            type="file"
            multiple
            accept="image/*"
            className="border border-gray-500 rounded px-3 py-1 w-full shadow-md mt-1"
            id="images"
            onChange={(e) => {
              const files = [];
              const urls = [];

              Array.from(e.target?.files).map((file) => {
                files.push(file);
                urls.push(URL.createObjectURL(file));
              });

              setMenuItemImages(files);
              setLocalImageUrls(urls);
            }}
          />
        </div>
      )}
      <div className="flex justify-center pt-5">
        <input
          type="submit"
          value={
            loading
              ? "Submitting..."
              : isEditing
              ? "Edit Menu Item"
              : "Add Menu Item"
          }
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-800 text-white px-10 py-2 rounded cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
        />
      </div>
      <ToastContainer />
    </form>
  );
}

export default MenuItemForm;
