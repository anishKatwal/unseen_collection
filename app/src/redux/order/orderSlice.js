import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    menuItems: [],
    totalPrice: 0,
    tableNumber: 1,
  },
  reducers: {
    setTableNumber: (state, action) => {
      state.tableNumber = action.payload;
    },
    addToOrder: (state, action) => {
      const menuItem = action.payload;

      const existingItem = state.menuItems?.find(
        (item) => item.id == menuItem.id
      );

      if (existingItem) {
        state.menuItems = state.menuItems.map((item) => {
          if (item.id == menuItem.id) {
            return { ...item, quantity: item.quantity + 1 };
          }

          return item;
        });
      } else {
        state.menuItems = [...state.menuItems, { ...menuItem, quantity: 1 }];
      }

      state.totalPrice = state.menuItems.reduce((total, item) => {
        total = item.price + state.totalPrice;

        return total;
      }, 0);
    },
    increaseQuantity: (state, action) => {
      const menuItem = action.payload;

      state.menuItems = state.menuItems.map((item) => {
        if (item.id == menuItem.id) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      });

      state.totalPrice = state.totalPrice + menuItem.price;
    },
    decreaseQuantity: (state, action) => {
      const menuItem = action.payload;

      if (menuItem.quantity <= 1) return;

      state.menuItems = state.menuItems.map((item) => {
        if (item.id == menuItem.id) {
          return { ...item, quantity: item.quantity - 1 };
        }

        return item;
      });

      state.totalPrice = state.totalPrice - menuItem.price;
    },
    removeFromOrder: (state, action) => {
      const menuItem = action.payload;

      state.menuItems = state.menuItems.filter(
        (item) => item.id != menuItem.id
      );

      state.totalPrice = state.totalPrice - menuItem.price * menuItem.quantity;
    },
    clearOrder: (state) => {
      state.menuItems = [];
      state.totalPrice = 0;
      state.tableNumber = 1;
    },
  },
});

export const {
  addToOrder,
  increaseQuantity,
  decreaseQuantity,
  removeFromOrder,
  clearOrder,
  setTableNumber,
} = orderSlice.actions;

export default orderSlice.reducer;
