import User from "../models/User.js";
import authService from "./authService.js";
import { formatUserData } from "../helpers/dataFormatter.js";
import { uploadFileOnCloudinary } from "../utils/file.js";
import { ROLE_EMPLOYEE, ROLE_USER } from "../constants/roles.js";

const getAllUsers = async () => {
  const users = await User.find();

  return users.map((user) => formatUserData(user));
};

const getCustomers = async () => {
  const users = await User.find({ roles: [ROLE_USER] });

  return users.map((user) => formatUserData(user));
};

const getEmployees = async () => {
  const users = await User.find({ roles: ROLE_EMPLOYEE });

  return users.map((user) => formatUserData(user));
};

const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user)
    throw {
      statusCode: 404,
      message: "User not found.",
    };

  return formatUserData(user);
};

const createUser = async (input) => {
  const user = await authService.registerUser(input);

  return user;
};

const updateUser = async (id, input) => {
  const user = await User.findById(id);

  if (!user)
    throw {
      statusCode: 404,
      message: "User not found.",
    };

  return await User.findByIdAndUpdate(id, input);
};

const deleteUser = async (id) => {
  const user = await User.findById(id);

  if (!user)
    throw {
      statusCode: 404,
      message: "User not found.",
    };

  return await User.findByIdAndDelete(id);
};

const updateProfileImage = async (id, file) => {
  const uploadedFile = await uploadFileOnCloudinary([file]);

  return await User.findByIdAndUpdate(id, {
    profileImageUrl: uploadedFile[0]?.secure_url,
  });
};

export default {
  createUser,
  deleteUser,
  getAllUsers,
  getCustomers,
  getEmployees,
  getUserById,
  updateProfileImage,
  updateUser,
};
