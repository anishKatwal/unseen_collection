import Category from "../models/Category.js";
import { formatCategoryData } from "../helpers/dataFormatter.js";

const getAllCategories = async () => {
  const categories = await Category.find();

  return categories.map((category) => formatCategoryData(category));
};

const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category)
    throw {
      statusCode: 404,
      message: "Category not found.",
    };

  return formatCategoryData(category);
};

const createCategory = async (input) => {
  const category = await Category.create(input);

  return category;
};

const updateCategory = async (id, input) => {
  const category = await Category.findById(id);

  if (!category)
    throw {
      statusCode: 404,
      message: "Category not found.",
    };

  return await Category.findByIdAndUpdate(id, input);
};

const deleteCategory = async (id) => {
  const category = await Category.findById(id);

  if (!category)
    throw {
      statusCode: 404,
      message: "Category not found.",
    };

  return await Category.findByIdAndDelete(id);
};

export default {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
};
