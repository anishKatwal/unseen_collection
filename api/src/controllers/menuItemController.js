import menuItemService from "../services/menuItemService.js";

const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await menuItemService.getAllMenuItems(req.query);

    res.json(menuItems);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getMenuItemsByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const menuItems = await menuItemService.getMenuItemsByCategory(category);

    res.json(menuItems);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const getMenuItemById = async (req, res) => {
  const id = req.params.id;

  try {
    const menuItem = await menuItemService.getMenuItemById(id);

    res.json(menuItem);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const createMenuItem = async (req, res) => {
  const data = req.body;
  const userId = req?.user.id;
  const files = req.files;

  try {
    if (files?.length > 5) {
      return res.status(400).send("MenuItem images cannot be more than 5.");
    }

    const menuItem = await menuItemService.createMenuItem(data, files, userId);

    res.json(menuItem);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const updateMenuItem = async (req, res) => {
  const data = req.body;
  const id = req.params.id;

  try {
    const menuItem = await menuItemService.getMenuItemById(id);

    if (!menuItem) return res.status(404).send("MenuItem not found.");

    const updatedMenuItem = await menuItemService.updateMenuItem(id, data);

    res.json(updatedMenuItem);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

const deleteMenuItem = async (req, res) => {
  const id = req.params.id;

  try {
    await menuItemService.deleteMenuItem(id);

    res.send(`MenuItem with id: ${id} deleted successfully`);
  } catch (error) {
    res.status(error.statusCode || 500).send(error.message);
  }
};

export {
  createMenuItem,
  deleteMenuItem,
  getAllMenuItems,
  getMenuItemById,
  getMenuItemsByCategory,
  updateMenuItem,
};
