import { HOME_ROUTE } from "../constants/routes";
import { Navigate, Outlet } from "react-router-dom";
import { ROLE_EMPLOYEE } from "../constants/userRoles";
import { useSelector } from "react-redux";

const EmployeeLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user && user?.roles.includes(ROLE_EMPLOYEE) ? (
        <Outlet />
      ) : (
        <Navigate to={HOME_ROUTE} />
      )}
    </>
  );
};

export default EmployeeLayout;
