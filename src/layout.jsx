import { Outlet, Link, NavLink } from "react-router";
import "./layout.css"
import { useEffect } from "react";
import { useAuth } from "./AuthProvider";

const Layout = () => {
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  console.log(user);
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
            {
              isAuthenticated && (
                <>
                  <li>
                    <button onClick={signOut} className="layout-btn">Logout</button>
                  </li>
                  <li>
                    <button type="button" className="layout-btn">{user.username}</button>
                  </li>
                </>
              )
            }
            {
              !isAuthenticated && (
                <>
                  <li>
                    <NavLink to="/login" className={({ isActive }) => isActive ? "active" : "not-active"}>Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                </>
              )
            }
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  )
};

export default Layout;