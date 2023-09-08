import React, { useEffect, useState } from 'react'
import avatar from "../../../assets/img/user.png";
import { Link, useParams } from 'react-router-dom';
import { Global } from "../../../helpers/Global";
import { GetProfile } from '../../../helpers/GetProfile';
import useAuth from '../../../hooks/useAuth';
import PublicationList from '../../layout/private/publication/PublicationList';

export default function Profile() {
    const { auth } = useAuth()
    const [loading, setLoading] = useState(true)
    const [userProfile, setUserProfile] = useState({})
    const [counters, setCounters] = useState({})
    const [iFollow, setIFollow] = useState(false)
    const [publications, setPublications] = useState([])
    const [page, setPage] = useState(1)
    const [more, setMore] = useState(true)

    const params = useParams()
    const token = localStorage.getItem("token")

    useEffect(() => {
        getCounters()
        getDataUser()
        getPublications(1, true)
    }, [])

    useEffect(() => {
        getCounters()
        getDataUser()
        setMore(true)
        getPublications(1, true)
    }, [params])

    const getDataUser = async () => {
        let dataUser = await GetProfile(Global.url, token, params.userId, setLoading, setUserProfile)
        if (dataUser.following && dataUser.following._id) setIFollow(true)
    }

    const getCounters = async () => {
        const res = await fetch(`${Global.url}user/counters/${params.userId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const data = await res.json()

        if (data.following) {
            setCounters(data)
        }
    }

    const follow = async (userId) => {
        const res = await fetch(`${url}follow/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({ followed: userId })
        })

        const data = await res.json()

        if (data.status == "success") {
            setIFollow(true)
        }
    }

    const unfollow = async (userId) => {
        const res = await fetch(`${url}follow/unfollow/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const data = await res.json()

        if (data.status == "success") {
            setIFollow(false)
        }
    }

    const getPublications = async (nextPage = 1, newProfile = false) => {
        const res = await fetch(`${Global.url}publication/user/${params.userId}/${nextPage}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const data = await res.json()

        if (data.status == "success") {
            let newPublications = data.publications

            if (!newProfile && publications.length >= 1) {
                newPublications = [...publications, ...data.publications]
            }

            if (newProfile) {
                newPublications = data.publications
                setMore(true)
                setPage(1)
            }

            setPublications(newPublications)

            if (!newProfile && publications.length >= (data.total - data.publications.length)) {
                setMore(false)
            }

            if (data.pages <= 1) {
                setMore(false)
            }
        }
    }

    return (
        <>
            <header className="aside__profile-info">

                <div className="profile-info__general-info">
                    {!loading ?
                        <>
                            <div className="general-info__container-avatar">
                                {userProfile.image != "default.png" ?
                                    <img src={`${Global.url}user/avatar/${userProfile.image}`} className="list-end__img" alt="Imagen de perfil" />
                                    :
                                    <img src={avatar} className="list-end__img" alt="Imagen de perfil" />
                                }
                            </div>
                        </>
                        :
                        <div>
                            <h2>Cargando imagen...</h2>
                        </div>
                    }

                    <div className="general-info__container-names">
                        {!loading ?
                            <>
                                <div className="container-names__name">
                                    <h1>{`${userProfile.name} ${userProfile.surname}`}</h1>
                                    {userProfile._id != auth._id &&
                                        (
                                            iFollow ?
                                                <button onClick={() => unfollow(userProfile._id)} className="content__button">Dejar de seguir</button>
                                                :
                                                <button onClick={() => follow(userProfile._id)} className="content__button">Seguir</button>
                                        )
                                    }
                                </div>
                            </>
                            :
                            <h1>Cargando...</h1>
                        }
                        <h2 className="container-names__nickname">{userProfile.nick}</h2>
                        <p>{userProfile.bio}</p>
                    </div>
                </div>

                <div className="profile-info__stats">
                    <div className="stats__following">
                        {!loading ?
                            <>
                                <Link to={`/social/following/${userProfile._id}`} className="following__link">
                                    <span className="following__title">Siguiendo</span>
                                    <span className="following__number">{counters.following >= 1 ? counters.following : 0}</span>
                                </Link>
                            </>
                            :
                            <h2>Cargando...</h2>
                        }
                    </div>
                    <div className="stats__following">
                        {!loading ?
                            <>
                                <Link to={`/social/followers/${userProfile._id}`} className="following__link">
                                    <span className="following__title">Seguidores</span>
                                    <span className="following__number">{counters.followed >= 1 ? counters.followed : 0}</span>
                                </Link>
                            </>
                            :
                            <h2>Cargando...</h2>
                        }
                    </div>
                    <div className="stats__following">
                        {!loading ?
                            <>
                                <Link to={`/social/profile/${userProfile._id}`} className="following__link">
                                    <span className="following__title">Publicaciones</span>
                                    <span className="following__number">{counters.publications >= 1 ? counters.publications : 0}</span>
                                </Link>
                            </>
                            :
                            <h2>Cargando...</h2>
                        }
                    </div>
                </div>
            </header>

            <PublicationList
                publications={publications}
                getPublications={getPublications}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
                token={token}
                url={Global.url}
            />

            <br />
        </>
    )
}

