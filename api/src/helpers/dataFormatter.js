export const formatCategoryData = (data) => ({
  id: data._id,
  name: data.name,
});

export const formatMenuItemData = (data) => ({
  id: data._id,
  category: data.category,
  createdAt: data.createdAt,
  createdBy: data.createdBy,
  description: data.description,
  imageUrls: data.imageUrls,
  isActive: data.isActive,
  name: data.name,
  price: data.price,
});

export const formatOrderData = (data) => ({
  id: data._id,
  orderNumber: data.orderNumber,
  tableNumber: data.tableNumber,
  customer: data.customer,
  items: data.items.map(({ menuItem, quantity, price }) => {
    if (!menuItem) return;

    return {
      menuItem: formatMenuItemData(menuItem),
      quantity,
      price,
    };
  }),
  totalPrice: data.totalPrice,
  status: data.status,
  createdBy: data.createdBy,
  createdAt: data.createdAt,
});

export const formatUserData = (data) => ({
  id: data._id,
  address: data.address,
  createdAt: data.createdAt,
  email: data.email,
  isActive: data?.isActive == undefined ? true : data.isActive,
  name: data.name,
  phone: data.phone ?? null,
  profileImageUrl: data.profileImageUrl ?? null,
  roles: data.roles,
});

export const formatScheduleData = (data) => ({
  id: data._id,
  user: formatUserData(data.user),
  startDateTime: data.startDateTime,
  endDateTime: data.endDateTime,
});
