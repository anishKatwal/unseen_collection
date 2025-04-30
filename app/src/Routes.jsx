import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import {
  ADD_MENU_ITEM_ROUTE,
  ADD_SCHEDULE_ROUTE,
  ADD_STAFF_ROUTE,
  ADD_TABLE_ORDERS_ROUTE,
  CART_ITEMS_ROUTE,
  EDIT_MENU_ITEM_ROUTE,
  EDIT_SCHEDULE_ROUTE,
  EDIT_STAFF_ROUTE,
  LOGIN_ROUTE,
  MENU_ITEM_LIST_ROUTE,
  MENU_ITEMS_ROUTE,
  ORDERS_LIST_ROUTE,
  ORDERS_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  SCHEDULES_ROUTE,
  STAFF_LIST_ROUTE,
  TABLE_ORDERS_GRID_ROUTE,
  TABLE_ORDERS_ROUTE,
  USERS_LIST_ROUTE,
} from "./constants/routes";
import AddMenuItem from "./pages/menuItems/Add";
import AddStaff from "./pages/users/staffs/Add";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import CartItems from "./pages/cart";
import CreateSchedule from "./pages/schedules/Add";
import CreateTableOrder from "./pages/orders/table/Create";
import EditMenuItem from "./pages/menuItems/Edit";
import EditSchedule from "./pages/schedules/Edit";
import EditStaff from "./pages/users/staffs/Edit";
import EmployeeLayout from "./layouts/EmployeeLayout";
import Login from "./pages/auth/Login";
import MainLayout from "./layouts/MainLayout";
import MenuItems from "./pages/menuItems";
import MenuItemsList from "./pages/menuItems/List";
import NotFound from "./pages/NotFound";
import OrderPayment from "./pages/orders/Payment";
import Orders from "./pages/orders";
import OrdersList from "./pages/orders/List";
import ProfilePage from "./pages/profile";
import Register from "./pages/auth/Register";
import SchedulesPage from "./pages/schedules";
import StaffsListPage from "./pages/users/staffs/List";
import TableOrders from "./pages/orders/table";
import TableOrdersGrid from "./pages/orders/table/OrderGrid";
import UnAuthLayout from "./layouts/UnAuthLayout";
import UsersPage from "./pages/users";

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path={MENU_ITEMS_ROUTE} element={<MenuItems />} />

        <Route element={<AuthLayout />}>
          <Route path={CART_ITEMS_ROUTE} element={<CartItems />} />
          <Route path={ORDERS_ROUTE} element={<Orders />} />
          <Route
            path={`${ORDERS_ROUTE}/:id/payment`}
            element={<OrderPayment />}
          />
          <Route path={PROFILE_ROUTE} element={<ProfilePage />} />

          <Route element={<EmployeeLayout />}>
            <Route path={MENU_ITEM_LIST_ROUTE} element={<MenuItemsList />} />
            <Route path={ADD_MENU_ITEM_ROUTE} element={<AddMenuItem />} />
            <Route path={TABLE_ORDERS_ROUTE} element={<TableOrders />} />
            <Route
              path={TABLE_ORDERS_GRID_ROUTE}
              element={<TableOrdersGrid />}
            />
            <Route
              path={ADD_TABLE_ORDERS_ROUTE}
              element={<CreateTableOrder />}
            />
            <Route
              path={`${EDIT_MENU_ITEM_ROUTE}/:id`}
              element={<EditMenuItem />}
            />
            <Route path={SCHEDULES_ROUTE} element={<SchedulesPage />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path={ORDERS_LIST_ROUTE} element={<OrdersList />} />
            <Route path={STAFF_LIST_ROUTE} element={<StaffsListPage />} />
            <Route path={USERS_LIST_ROUTE} element={<UsersPage />} />
            <Route path={ADD_STAFF_ROUTE} element={<AddStaff />} />
            <Route path={`${EDIT_STAFF_ROUTE}/:id`} element={<EditStaff />} />

            <Route path={ADD_SCHEDULE_ROUTE} element={<CreateSchedule />} />
            <Route
              path={`${EDIT_SCHEDULE_ROUTE}/:id`}
              element={<EditSchedule />}
            />
          </Route>
        </Route>

        <Route element={<UnAuthLayout />}>
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route path={REGISTER_ROUTE} element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Routes;
