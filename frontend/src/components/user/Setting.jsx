import React from 'react'
import avatar from '../../assets/img/user.png'
import { Global } from "../../helpers/Global";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register/Register.css";
import useAuth from '../../hooks/useAuth';
import { SerializeForm } from '../../helpers/SerializeForm';

export const Setting = () => {
    const { auth, setAuth } = useAuth()

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

    const updateUser = async (e) => {
        e.preventDefault();
        let userUpdated = SerializeForm(e.target);
        const token = localStorage.getItem("token")

        delete userUpdated.file0

        const res = await fetch(`${Global.url}user/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(userUpdated),
        });

        const data = await res.json();

        if (data.status == "success" && data.user) {
            delete data.user.password
            setAuth(data.user)
            msgSuccess(data.message);
        } else {
            msgError(data.message);
        }

        const fileInput = document.querySelector("#file")
        const formData = new FormData()

        formData.append('file0', fileInput.files[0])

        if (data.status == "success" && fileInput.files[0]) {
            const uploadReq = await fetch(`${Global.url}user/upload`, {
                method: "POST",
                headers: {
                    "Authorization": token
                },
                body: formData
            })

            const uploadData = await uploadReq.json()

            if (uploadData.status == "success" && uploadData.user) {
                delete uploadData.user.password
                setAuth(uploadData.user)
                msgSuccess(uploadData.message);
            } else {
                msgError(uploadData.message);
            }
        }
    };

    return (
        <>
            <div className="register__container">
                <ToastContainer />
                <form onSubmit={updateUser} className="form__register">
                    <h1 className="title__register">Ajustes</h1>
                    <div className="container__data">
                        <div className="container__input">
                            <label htmlFor="name" className="label__register">
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                defaultValue={auth.name}
                            />
                        </div>
                        <div className="container__input">
                            <label htmlFor="surname" className="label__register">
                                Apellido
                            </label>
                            <input
                                type="text"
                                name="surname"
                                placeholder="Apellido"
                                defaultValue={auth.surname}
                            />
                        </div>
                        <div className="container__input">
                            <label htmlFor="nick" className="label__register">
                                Nick
                            </label>
                            <input
                                type="text"
                                name="nick"
                                placeholder="Nick"
                                defaultValue={auth.nick}
                            />
                        </div>
                    </div>
                    <div className="container__input">
                        <label htmlFor="bio" className="label__register">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            placeholder="Biografia"
                            defaultValue={auth.bio}
                        />
                    </div>
                    <div className="container__input">
                        <label htmlFor="email" className="label__register">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo Electronico"
                            defaultValue={auth.email}
                        />
                    </div>
                    <div className="container__input">
                        <label htmlFor="password" className="label__register">
                            Contrasenia
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Contrasenia"
                        />
                    </div>
                    <div className="form-post__inputs">
                        <label htmlFor="file0" className="form-post__label">
                            Foto de perfil
                        </label>
                        <div className="general-info__container-avatar">
                            {auth.image != "default.png" ?
                                <img src={`${Global.url}user/avatar/${auth.image}`} className="list-end__img" alt="Imagen de perfil" />
                                :
                                <img src={avatar} className="list-end__img" alt="Imagen de perfil" />
                            }
                        </div>
                        <input type="file" name="file0" id='file' />
                    </div>
                    <input type="submit" value="Guardar Cambios" className="btn__register" />
                </form>
            </div>
        </>
    );
}