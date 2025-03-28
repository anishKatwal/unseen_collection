import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { HOME_ROUTE } from "../constants/routes";

const UnAuthLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return <>{user ? <Navigate to={HOME_ROUTE} /> : <Outlet />}</>;
};

export default UnAuthLayout;
