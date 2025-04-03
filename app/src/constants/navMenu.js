import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  MENU_ITEMS_ROUTE,
  ORDERS_ROUTE,
  REGISTER_ROUTE,
} from "./routes";

const navMenu = [
  {
    label: "Home",
    route: HOME_ROUTE,
    auth: true,
  },
  {
    label: "Menu",
    route: MENU_ITEMS_ROUTE,
    auth: true,
  },
  {
    label: "Orders",
    route: ORDERS_ROUTE,
    auth: true,
  },
  {
    label: "Login",
    route: LOGIN_ROUTE,
    auth: false,
  },
  {
    label: "Register",
    route: REGISTER_ROUTE,
    auth: false,
  },
];

export default navMenu;
