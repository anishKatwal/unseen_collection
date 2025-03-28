import MenuItem from "../models/MenuItem.js";
import { formatMenuItemData } from "../helpers/dataFormatter.js";
import { uploadFileOnCloudinary } from "../utils/file.js";

const getAllMenuItems = async (query) => {
  const limit = query.limit;
  const offset = query.offset;
  const sort = JSON.parse(query.sort || "{}");
  const filters = {};

  const { name, category, min, max, isActive } = query;

  if (name) filters.name = { $regex: name, $options: "i" }; // Case-insensitive match
  if (category) filters.category = category;

  if (min) filters.price = { $gte: parseFloat(min) };

  if (max) {
    filters.price = {
      ...filters.price,
      $lte: parseFloat(max),
    };
  }

  if (isActive != undefined) filters.isActive = isActive;

  const menuItems = await MenuItem.find(filters)
    .limit(limit)
    .sort(sort)
    .skip(offset);

  return menuItems.map((menuItem) => formatMenuItemData(menuItem));
};

const getMenuItemsByCategory = async (category) => {
  const menuItems = await MenuItem.find({ category });

  return menuItems.map((menuItem) => formatMenuItemData(menuItem));
};

const getMenuItemById = async (id) => {
  const menuItem = await MenuItem.findById(id);

  if (!menuItem)
    throw {
      statusCode: 404,
      message: "Item not found.",
    };

  return formatMenuItemData(menuItem);
};

const createMenuItem = async (data, files, userId) => {
  const uploadedFiles = files && (await uploadFileOnCloudinary(files));

  return await MenuItem.create({
    ...data,
    imageUrls: uploadedFiles.map((file) => file.secure_url),
    createdBy: userId,
  });
};

const updateMenuItem = async (id, data) => {
  return await MenuItem.findByIdAndUpdate(id, data);
};

const deleteMenuItem = async (id) => {
  const menuItem = await MenuItem.findById(id);

  if (!menuItem)
    throw {
      statusCode: 404,
      message: "Item not found.",
    };

  return await MenuItem.findByIdAndDelete(id);
};

export default {
  createMenuItem,
  deleteMenuItem,
  getAllMenuItems,
  getMenuItemsByCategory,
  getMenuItemById,
  updateMenuItem,
};
