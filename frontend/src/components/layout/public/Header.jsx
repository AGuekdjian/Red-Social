import React from 'react'
import Nav from './Nav'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header className="layout__navbar">
            <div className="navbar__header">
                <NavLink to="/" className="navbar__title">RED SOCIAL</NavLink>
            </div>

            <Nav />
        </header>
    )
}

export default Header