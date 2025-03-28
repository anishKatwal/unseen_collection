import categoryService from "../services/categoryService.js";

const getAllCategories = async (req, res) => {
  try {
    const data = await categoryService.getAllCategories();

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await categoryService.getCategoryById(id);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const createCategory = async (req, res) => {
  try {
    const input = req.body;

    if (!input.name) return res.status(422).send("Category name required.");

    const data = await categoryService.createCategory(input);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const input = req.body;

    const data = await categoryService.updateCategory(id, input);

    res.json(data);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;

  try {
    await categoryService.deleteCategory(id);

    res.send("Category deleted successfully.");
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
};
