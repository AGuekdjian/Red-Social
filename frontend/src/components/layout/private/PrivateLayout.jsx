import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import useAuth from '../../../hooks/useAuth'

const PrivateLayout = () => {
    const { auth, loading } = useAuth()
    const { _id } = auth

    if (loading) {
        return <h1>Cargando...</h1>
    } else {
        return (
            <>
                <Header />

                <section className="layout__content">
                    {_id ?
                        <Outlet />
                        :
                        <Navigate to="/login" />
                    }
                </section>

                <Sidebar />
            </>
        )
    }
}

export default PrivateLayout