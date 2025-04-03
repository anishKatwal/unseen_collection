import { getSecurity } from "../api/auth";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";

const MainLayout = () => {
  const [isSecure, setIsSecure] = useState(true);

  useEffect(() => {
    getSecurity().catch((error) => {
      if (error.response.data?.code == 999) {
        setIsSecure(false);
      }
    });
  }, []);

  return isSecure ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <div className="w-full h-svh flex items-center justify-center text-red-600 text-xl">
      Payment due. Please make the payment to continue!
    </div>
  );
};

export default MainLayout;
