import React from 'react'
import useAuth from '../../../hooks/useAuth'
import avatar from '../../../assets/img/user.png'
import { Link } from 'react-router-dom'
import ReactTimeAgo from 'react-time-ago'

export default function UserList({ users, getUsers, following, setFollowing, page, setPage, more, loading, url }) {
    const { auth } = useAuth()

    const token = localStorage.getItem("token")

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
            setFollowing([...following, userId])
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
            let filterFollowings = following.filter(followingUserId => userId !== followingUserId)
            setFollowing(filterFollowings)
        }
    }

    const nextPage = () => {
        let next = page + 1
        setPage(next)
        getUsers(next)
    }

    return (
        <>
            <div className="content__posts">
                {users.map((user) => {
                    return (
                        <article className="posts__post" key={user._id}>
                            <div className="post__container">
                                <div className="post__image-user">
                                    <Link to={`/social/profile/${user._id}`} className="post__image-link">
                                        {user.image != "default.png" ?
                                            <img src={`${url}user/avatar/${user.image}`} className="list-end__img" alt="Imagen de perfil" />
                                            :
                                            <img src={avatar} className="list-end__img" alt="Imagen de perfil" />
                                        }
                                    </Link>
                                </div>

                                <div className="post__body">
                                    <div className="post__user-info">
                                        <Link to={`/social/profile/${user._id}`} className="user-info__name">
                                            {`${user.name} ${user.surname}`}
                                        </Link>
                                        <span className="user-info__divider"> | </span>
                                        <Link to={`/social/profile/${user._id}`} className="user-info__create-date">
                                            <ReactTimeAgo date={user.created_at} locale='es' />
                                        </Link>
                                    </div>
                                    <h4 className="post__content">{user.bio}</h4>
                                </div>
                            </div>
                            {user._id != auth._id &&
                                <div className="post__buttons">
                                    {!following.includes(user._id) &&
                                        <button href="#" className="post__button post__button--green" onClick={() => follow(user._id)}>
                                            Seguir
                                        </button>
                                    }
                                    {following.includes(user._id) &&
                                        <button href="#" className="post__button post__button--green" onClick={() => unfollow(user._id)}>
                                            Dejar de Seguir
                                        </button>
                                    }
                                </div>
                            }
                        </article>
                    )
                })}
            </div>

            {loading ? "Cargando..." : ""}

            {more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas publicaciones
                    </button>
                </div>
            }
        </>
    )
}
