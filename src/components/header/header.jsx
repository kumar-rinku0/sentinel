import { Outlet, Link, NavLink, useNavigate } from "react-router";
import "./header.css"
import { useAuth } from "../../AuthProvider";
import { FaHouse, FaLinesLeaning, FaPlus, FaUser } from "react-icons/fa6";
import NonLoginHeader from "./non-login-header";



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
    return <NonLoginHeader />
  }
  return (
    <>
      <div className="header">
        <Link to="/" className="logo-shadow">
          Sentinel Prime!
        </Link>
        <div className="mobile">
          <div onClick={handleSignOut} className="logout-btn">Logout</div>
        </div>
        <nav className="navbar">
          {
            links.map((link) => {
              return (<NavLink className={({ isActive }) => isActive ? "orange nav-click" : "primary"} key={link.path} to={link.path}>
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
            <div onClick={handleSignOut} className="logout-btn">Logout</div>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  )
};

export default Header;