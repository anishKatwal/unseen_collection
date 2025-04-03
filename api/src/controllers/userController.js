import { ROLE_ADMIN, ROLE_EMPLOYEE } from "../constants/roles.js";
import userService from "../services/userService.js";

const getAllUsers = async (req, res) => {
  try {
    const data = await userService.getAllUsers();

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getCustomers = async (req, res) => {
  try {
    const data = await userService.getCustomers();

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getEmployees = async (req, res) => {
  try {
    const data = await userService.getEmployees();

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await userService.getUserById(id);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const createUser = async (req, res) => {
  const user = req.user;

  try {
    const input = req.body;

    if (!input.email || !input.password)
      return res.status(422).send("Email or password is required.");

    if (
      input.roles.includes(ROLE_EMPLOYEE) &&
      !user.roles.includes(ROLE_ADMIN)
    ) {
      return res.status(403).send("Access denied.");
    }

    const data = await userService.createUser(input);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const input = req.body;

    const data = await userService.updateUser(id, input);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await userService.deleteUser(id);

    res.send("User deleted successfully.");
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateProfileImage = async (req, res) => {
  const file = req.file;
  const id = req.params.id;

  try {
    const response = await userService.updateProfileImage(id, file);

    res.json(response);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export {
  createUser,
  deleteUser,
  getAllUsers,
  getCustomers,
  getEmployees,
  getUserById,
  updateProfileImage,
  updateUser,
};
