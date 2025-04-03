import { formatUserData } from "../helpers/dataFormatter.js";
import { ROLE_ADMIN, ROLE_EMPLOYEE, ROLE_USER } from "../constants/roles.js";
import { uploadFileOnCloudinary } from "../utils/file.js";
import authService from "./authService.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const getAllUsers = async () => {
  const users = await User.find();

  return users.map((user) => formatUserData(user));
};

const getCustomers = async () => {
  const users = await User.find({ roles: [ROLE_USER] });

  return users.map((user) => formatUserData(user));
};

const getEmployees = async () => {
  const users = await User.find({
    $and: [
      { roles: ROLE_EMPLOYEE },
      {
        roles: {
          $ne: ROLE_ADMIN,
        },
      },
    ],
  });

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

  if (input.password) {
    input.password = bcrypt.hashSync(input.password);
  }

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
