import { Outlet, Link, NavLink } from "react-router";
import "./header.css"
import { useAuth } from "../../AuthProvider";

const Header = () => {
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  console.log(user);

  if (!isAuthenticated) {
    return (
      <>
        <div className="navbar">
          <Link to="/">
            sentinel
          </Link>
          <nav >
            <ul >
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "orange" : "black"}>  Home </NavLink>
              </li>
              <li>
                <NavLink to="/login" className={({ isActive }) => isActive ? "orange" : "black"}>Login</NavLink>
              </li>
              <li>
                <NavLink to="/register" className={({ isActive }) => isActive ? "layout-outline-btn" : "layout-filled-btn"}>Get Started </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <Outlet />
      </>
    )
  }
  return (
    <>
      <div className="navbar">
        <Link to="/">
          sentinel
        </Link>
        <nav >
          <ul >
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "orange" : "black"}>  Home </NavLink>
            </li>
            <li>
              <div onClick={signOut} className="layout-btn">Logout</div>
            </li>
            <li>
              <div type="button" className="layout-btn">{user.username}</div>
            </li>
            <li>
              <NavLink to="/create" className={({ isActive }) => isActive ? "orange" : "black"}>create</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  )
};

export default Header;