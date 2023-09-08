import React, { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { Global } from "../../../helpers/Global";
import useAuth from "../../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

export const Login = () => {
  const { form, changed } = useForm({});
  const [logged, setLogged] = useState("not_sended");

  const { setAuth } = useAuth();

  const msgError = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    let userToLogin = form;

    try {
      const res = await fetch(`${Global.url}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToLogin),
      });

      const data = await res.json();

      if (data.status == "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setLogged("logged");
        setAuth(data.user);
        setTimeout(() => {
          window.location.reload();
        }, 400);
      } else {
        setLogged("error");
        msgError(data.message);
      }
    } catch (error) {
      throw new Error("Ha ocurrido un error!");
    }
  };

  return (
    <div className="login__container">
      <ToastContainer />
      <form onSubmit={loginUser} className="form__login">
        <h1 className="title__login">Iniciar Sesion</h1>
        <div className="container__content__inputs">
          <div className="container__data__login">
            <label htmlFor="email" className="label__login">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={changed}
              placeholder="Correo Electronico"
            />
          </div>
          <div className="container__data__login">
            <label htmlFor="password" className="label__login">
              Contrasenia
            </label>
            <input
              type="password"
              name="password"
              onChange={changed}
              placeholder="Contrasenia"
            />
          </div>
        </div>
        <input type="submit" value="Iniciar Sesion" className="btn__login" />
        <div className="container__tools">
          <h5>Olvide mi contrasenia!</h5>
          <NavLink to="/register" className="btn__redirect__register">
            Registrarse
          </NavLink>
        </div>
      </form>
    </div>
  );
};
