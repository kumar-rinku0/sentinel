import { Outlet, Link, NavLink } from "react-router";
import "./header.css"
import { useAuth } from "../../AuthProvider";
import { FaHome } from "react-icons/fa";
import { FaPlus, FaUser } from "react-icons/fa6";


const Header = () => {
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  const links = [
    {
      name: "home",
      icon: <FaHome />,
      path: "/",
    },
    {
      name: `${user?.username}`,
      icon: <FaUser />,
      path: "/mylisting",
    },
    {
      name: "profile",
      icon: <FaUser />,
      path: `${user?.username}`,
    },
    {
      name: "create",
      icon: <FaPlus />,
      path: "/create",
    },
  ]

  if (!isAuthenticated) {
    return (
      <>
        <div className="header">
          <Link to="/">
            Sentinel Prime!
          </Link>
          <nav className="navigation">
            {/* <li>
                <NavLink to="/" className={({ isActive }) => isActive ? "orange" : "black"}>  Home </NavLink>
              </li> */}

            <NavLink to="/login" className={({ isActive }) => isActive ? "orange" : "black"}>Login</NavLink>

            <NavLink to="/register" className={({ isActive }) => isActive ? "layout-outline-btn" : "layout-filled-btn"}>Get Started </NavLink>

          </nav>
        </div>
        <Outlet />
      </>
    )
  }
  return (
    <>
      <div className="header">
        <Link to="/">
          Sentinel Prime!
        </Link>
        <nav className="navigation">
          <div onClick={signOut} className="layout-btn">Logout</div>
        </nav>
        <nav className="navbar">
          {
            links.map((link) => {
              return (<NavLink className={({ isActive }) => isActive ? "orange" : "black"} key={link.path} to={link.path}>
                <span className="desktop">
                  {link.name}
                </span>
                <span className="mobile">
                  {link.icon}
                </span>
              </NavLink>)
            })
          }
          {/* <NavLink to="/" className={({ isActive }) => isActive ? "orange" : "black"}>
            <FaHome />
          </NavLink>

          <NavLink to="/mylisting" className={({ isActive }) => isActive ? "orange" : "black"}>
            <FaUser />
          </NavLink>

          <NavLink to="/create" className={({ isActive }) => isActive ? "orange" : "black"}>
            <FaPlus />
          </NavLink> */}
        </nav>
      </div>
      <Outlet />
    </>
  )
};

export default Header;