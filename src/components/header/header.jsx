import { Outlet, Link, NavLink, useNavigate } from "react-router";
import "./header.css"
import { useAuth } from "../../AuthProvider";
import { FaHouse, FaLinesLeaning, FaPlus, FaUser } from "react-icons/fa6";


const Header = () => {
  const { isAuthenticated, user, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const links = [
    {
      name: "home",
      icon: <FaHouse />,
      path: "/",
    },
    {
      name: `${user?.username}`,
      icon: <FaLinesLeaning />,
      path: "/mylisting",
    },
    {
      name: "create",
      icon: <FaPlus />,
      path: "/create",
    },
    {
      name: "profile",
      icon: <FaUser />,
      path: `${user?.username}`,
    },
  ];

  const handleSignOut = () => {
    signOut();
    navigate("/");
  }

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
        <div className="mobile">
          <div onClick={handleSignOut} className="layout-btn">Logout</div>
        </div>
        <nav className="navbar">
          {
            links.map((link) => {
              return (<NavLink className={({ isActive }) => isActive ? "orange nav-click" : "black"} key={link.path} to={link.path}>
                <span className="desktop">
                  {link.name}
                </span>
                <span className="mobile">
                  {link.icon}
                </span>
              </NavLink>)
            })
          }
          <div className="desktop navigation">
            <div onClick={handleSignOut} className="layout-btn">Logout</div>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  )
};

export default Header;