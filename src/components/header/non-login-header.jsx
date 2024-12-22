import { Outlet, Link, NavLink, useNavigate } from "react-router";
import "./header.css"

const NonLoginHeader = () => {
  return (
    <>
      <div className="header">
        <Link to="/" className="logo-shadow">
          Sentinel Prime!
        </Link>
        <nav className="navigation">

          <NavLink to="/login" className={({ isActive }) => isActive ? "white" : "primary"}>Login</NavLink>

          <NavLink to="/register" className={({ isActive }) => isActive ? "layout-outline-btn" : "layout-filled-btn"}>Get Started </NavLink>

        </nav>
      </div>
      <Outlet />
    </>
  )
}

export default NonLoginHeader;