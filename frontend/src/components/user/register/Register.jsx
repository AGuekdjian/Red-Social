import React from "react";
import { useForm } from "../../../hooks/useForm";
import { Global } from "../../../helpers/Global";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Register = () => {
  const { form, changed } = useForm({});
  const navigate = useNavigate();

  const msgSuccess = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

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

  const saveUser = async (e) => {
    e.preventDefault();
    let newUser = form;

    try {
      const res = await fetch(`${Global.url}user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (data.status == "success") {
        if (data.message == "El usuario ya existe") {
          msgError(data.message);
          return;
        }
        msgSuccess(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        msgError(data.message);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error!");
    }
  };

  return (
    <>
      <div className="register__container">
        <ToastContainer />
        <form onSubmit={saveUser} className="form__register">
          <h1 className="title__register">Registrarse</h1>
          <div className="container__data">
            <div className="container__input">
              <label htmlFor="name" className="label__register">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                onChange={changed}
                placeholder="Nombre"
              />
            </div>
            <div className="container__input">
              <label htmlFor="surname" className="label__register">
                Apellido
              </label>
              <input
                type="text"
                name="surname"
                onChange={changed}
                placeholder="Apellido"
              />
            </div>
          </div>
          <div className="container__input">
            <label htmlFor="email" className="label__register">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={changed}
              placeholder="Correo Electronico"
            />
          </div>
          <div className="container__input">
            <label htmlFor="password" className="label__register">
              Contrasenia
            </label>
            <input
              type="password"
              name="password"
              onChange={changed}
              placeholder="Contrasenia"
            />
          </div>
          <input type="submit" value="Registrarse" className="btn__register" />
          <NavLink to="/login" className="btn__signIn">
            Iniciar Sesion
          </NavLink>
        </form>
      </div>
    </>
  );
};

export default Register;
