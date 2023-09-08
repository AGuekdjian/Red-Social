import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import useAuth from "../../../hooks/useAuth";

const PublicLayout = () => {
  const { auth } = useAuth()
  const { _id } = auth
  return (
    <>
      <Header />

      <section className="layout__content public">
        {!_id ?
          <Outlet />
          :
          <Navigate to="/social" />
        }
      </section>
    </>
  );
};

export default PublicLayout;
