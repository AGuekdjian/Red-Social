import React from "react";
import useAuth from "../../../hooks/useAuth";
import { Global } from "../../../helpers/Global";
import avatar from '../../../assets/img/user.png'
import { Link } from "react-router-dom";
import { useForm } from '../../../hooks/useForm'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = () => {
  const { auth, counters } = useAuth();
  const { name, surname, nick, image } = auth;
  const { following, followed, publications } = counters;

  const { changed, form } = useForm()

  const token = localStorage.getItem("token")

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
    })
  }

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
    })
  }

  const savePublication = async (e) => {
    e.preventDefault()

    const myForm = document.getElementById('publication-form')

    let newPublication = form
    newPublication.user = auth._id

    const res = await fetch(`${Global.url}publication/save`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(newPublication)
    })

    const data = await res.json()

    if (data.status = "success") {
      myForm.reset()
      msgSuccess(data.message)
    } else {
      myForm.reset()
      msgError(data.message)
    }

    const fileInput = document.querySelector('#file')
    const formData = new FormData()

    formData.append("file0", fileInput.files[0])

    if (data.status == "success" && fileInput.files[0]) {
      const uploadRes = await fetch(`${Global.url}publication/upload/${data.publicationStored._id}`, {
        method: "POST",
        headers: {
          "Authorization": token
        },
        body: formData
      })

      const uploadData = await uploadRes.json()


      if (uploadData.status != "success") {
        myForm.reset()
        msgError(uploadData.message)
      }
    }
  }

  return (
    <aside className="layout__aside">
      <header className="aside__header">
        <h1 className="aside__title">{`Hola, ${name}`}</h1>
      </header>

      <div className="aside__container">
        <div className="aside__profile-info">
          <div className="profile-info__general-info">
            <div className="general-info__container-avatar">
              {image != "default.png" ?
                <img src={`${Global.url}user/avatar/${image}`} className="list-end__img" alt="Imagen de perfil" />
                :
                <img src={avatar} className="list-end__img" alt="Imagen de perfil" />
              }
            </div>

            <div className="general-info__container-names">
              <Link to={`/social/profile/${auth._id}`} className="container-names__name">
                {`${name} ${surname}`}
              </Link>
              <p className="container-names__nickname">{`${nick}`}</p>
            </div>
          </div>

          <div className="profile-info__stats">
            <div className="stats__following">
              <Link to={`/social/following/${auth._id}`} className="following__link">
                <span className="following__title">Siguiendo</span>
                <span className="following__number">{following}</span>
              </Link>
            </div>
            <div className="stats__following">
              <Link to={`/social/followers/${auth._id}`} className="following__link">
                <span className="following__title">Seguidores</span>
                <span className="following__number">{followed}</span>
              </Link>
            </div>

            <div className="stats__following">
              <Link to={`/social/profile/${auth._id}`} className="following__link">
                <span className="following__title">Publicaciones</span>
                <span className="following__number">{publications}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="aside__container-form">
          <ToastContainer />
          <form className="container-form__form-post" onSubmit={savePublication} id="publication-form">
            <div className="form-post__inputs">
              <label htmlFor="text" className="form-post__label">
                ¿Que estas pensando hoy?
              </label>
              <textarea name="text" className="form-post__textarea" onChange={changed} />
            </div>

            <div className="form-post__inputs">
              <label htmlFor="file" className="form-post__label">
                Sube tu foto
              </label>
              <input type="file" name="file0" className="form-post__image" id="file" />
            </div>

            <input
              type="submit"
              value="Enviar"
              className="form-post__btn-submit"
            />
          </form>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
