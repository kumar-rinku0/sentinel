import { Outlet, Link, NavLink } from "react-router";
import "./layout.css"

const Layout = () => {
  return (
    <>
      <div className="navbar">
        <div>
          luminous
        </div>
        <nav >
          <ul >
            <li>
              <NavLink to="/" end>Home</NavLink>
            </li>
            <li>
              <NavLink to="/login" className={({ isActive }) => isActive ? "active" : "not-active"}>Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  )
};

export default Layout;