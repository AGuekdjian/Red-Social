import React from "react";
import useAuth from "../../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import { Global } from "../../../helpers/Global";
import avatar from '../../../assets/img/user.png'

const Nav = () => {
  const { auth } = useAuth();
  const { nick, image } = auth;

  return (
    <nav className="navbar__container-lists">
      <ul className="container-lists__menu-list">
        <li className="menu-list__item">
          <NavLink to="/social">
            <i className="fa-solid fa-house"></i>
            <span className="menu-list__title">Inicio</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/social/feed">
            <i className="fa-solid fa-list"></i>
            <span className="menu-list__title">Timeline</span>
          </NavLink>
        </li>

        <li className="menu-list__item">

          <NavLink to="/social/people">
            <i className="fa-solid fa-user"></i>
            <span className="menu-list__title">Gente</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <a href="#" className="menu-list__link">
            <i className="fa-regular fa-envelope"></i>
            <span className="menu-list__title">Mensajes</span>
          </a>
        </li>
      </ul>

      <ul className="container-lists__list-end">
        <li className="list-end__item">
          <NavLink to={`/social/profile/${auth._id}`} className="list-end__link-image">
            {image != "default.png" ?
              <img src={`${Global.url}user/avatar/${image}`} className="list-end__img" alt="Imagen de perfil" />
              :
              <img src={avatar} className="list-end__img" alt="Imagen de perfil" />
            }
          </NavLink>
        </li>
        <li className="list-end__item">
          <NavLink to={`/social/profile/${auth._id}`} className="list-end__link">
            <span className="list-end__name">{`${nick}`}</span>
          </NavLink>
        </li>
        <li className="list-end__item">
          <NavLink to="/social/settings">
            <i className="fa-solid fa-gear"></i>
            <span className="list-end__name">Ajustes</span>
          </NavLink>
        </li>
        <li className="list-end__item">
          <NavLink to="/social/logout" className="list-end__link">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className="list-end__name">Cerrar Sesion</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
