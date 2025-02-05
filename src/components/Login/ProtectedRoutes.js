import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";

const ProtectedRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("authToken") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  if (isLoggedIn === null) {
    return <Loading />;
  }

  return isLoggedIn ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoutes;
