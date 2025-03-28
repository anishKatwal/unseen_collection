import { HOME_ROUTE } from "../constants/routes";
import { Navigate, Outlet } from "react-router-dom";
import { ROLE_ADMIN } from "../constants/userRoles";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user && user?.roles.includes(ROLE_ADMIN) ? (
        <Outlet />
      ) : (
        <Navigate to={HOME_ROUTE} />
      )}
    </>
  );
};

export default AdminLayout;
