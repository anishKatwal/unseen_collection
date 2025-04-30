import {
  MENU_ITEM_LIST_ROUTE,
  ORDERS_LIST_ROUTE,
  PROFILE_ROUTE,
  SCHEDULES_ROUTE,
  STAFF_LIST_ROUTE,
  TABLE_ORDERS_ROUTE,
} from "./routes";
import { ROLE_ADMIN, ROLE_EMPLOYEE, ROLE_USER } from "./userRoles";

const adminMenu = [
  {
    label: "Profile",
    route: PROFILE_ROUTE,
    role: ROLE_USER,
  },
  {
    label: "Manage Menu",
    route: MENU_ITEM_LIST_ROUTE,
    role: ROLE_EMPLOYEE,
  },
  {
    label: "Manage Orders",
    route: ORDERS_LIST_ROUTE,
    role: ROLE_ADMIN,
  },
  {
    label: "Table Orders",
    route: TABLE_ORDERS_ROUTE,
    role: ROLE_EMPLOYEE,
  },
  {
    label: "Manage Staff",
    route: STAFF_LIST_ROUTE,
    role: ROLE_ADMIN,
  },
  {
    label: "Staff Schedules",
    route: SCHEDULES_ROUTE,
    role: ROLE_EMPLOYEE,
  },
];

export default adminMenu;
