import React from 'react'
import avatar from '../../../../assets/img/user.png'
import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import ReactTimeAgo from 'react-time-ago'

export default function PublicationList({ publications, getPublications, page, setPage, more, setMore, token, url }) {
    const { auth } = useAuth()

    const nextPage = () => {
        let next = page + 1
        setPage(next)
        getPublications(next)
    }

    const deletePublication = async (publicationId) => {
        const res = await fetch(`${url}publication/remove/${publicationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })

        const data = await res.json()

        setPage(1)
        setMore(true)
        getPublications(1, true)
    }

    return (
        <>
            <div className="content__posts">
                {publications.map((publication) => {
                    return (
                        <article className="posts__post" key={publication._id}>
                            <div className="post__container">
                                <div className="post__image-user">
                                    <Link to={`/social/profile/${publication.user._id}`} className="post__image-link">
                                        {publication.user.image != "default.png" ?
                                            <img src={`${url}user/avatar/${publication.user.image}`} className="list-end__img" alt="Imagen de perfil" />
                                            :
                                            <img src={avatar} className="list-end__img" alt="Imagen de perfil" />
                                        }
                                    </Link>
                                </div>

                                <div className="post__body">
                                    <div className="post__user-info">
                                        <a href="#" className="user-info__name">
                                            {`${publication.user.name} ${publication.user.surname}`}
                                        </a>
                                        <span className="user-info__divider"> | </span>
                                        <a href="#" className="user-info__create-date">
                                            <ReactTimeAgo date={publication.created_at} locale='es' />
                                        </a>
                                    </div>
                                    <h4 className="post__content">{publication.text}</h4>
                                    {publication.file && <img src={`${url}publication/media/${publication.file}`} />}
                                </div>
                            </div>

                            {auth._id == publication.user._id &&
                                <div className="post__buttons">
                                    <button onClick={() => deletePublication(publication._id)} className="post__button">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            }
                        </article>
                    )
                })}
            </div>

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
