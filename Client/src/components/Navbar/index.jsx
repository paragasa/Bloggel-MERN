
import React from 'react'
import {Link} from 'react-router-dom'


const Navbar = ({authUser, removeAuthUser}) =>{
    return(
        <nav className="topbar topbar-inverse topbar-expand-md topbar-sticky">
        <div className="container">
          <div className="topbar-left">
            <button className="topbar-toggler">
              <div className="bar bar-1"></div>
              <div className="bar bar-2"></div>
              <div className="bar bar-3"></div>
            </button>
            <Link className="topbar-brand" to="/">
              <img className="logo-default" src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt="logo" />
              <img className="logo-inverse" src={`${process.env.PUBLIC_URL}/assets/img/logo-light.png`} alt="logo" />
            </Link>
          </div>
          <div className="topbar-right">
            <ul className="topbar-nav nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"  to="/articles/create">Write new article</Link>
              </li>
              {
                authUser &&
                <li className="nav-item">
                  <a className="nav-link">Hey {authUser && authUser.user.name}!
                    <i className="fa fa-caret-down" />
                  </a>
                  <div className="nav-submenu">
                    <Link className="nav-link" to="/user/articles">My articles</Link>
                    <Link className="nav-link" onClick={removeAuthUser} to="/">Logout</Link>
                  </div>
                </li>
              }
              {
                !authUser &&
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              }
              {
                !authUser &&
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Signup</Link>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    )
}
export default Navbar;