import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { isLoggedIn, logout, getUserName, getUserRole } from "../../service/utills";

function Navbar({ onUserLogout }) {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  function handleLogout() {
    logout();
    onUserLogout();
  }

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div>
            {!isLoggedIn() ?
              <Link to="/login" id="login-btn">
                <span className="fa fa-user" aria-hidden="true" title="Login"></span>
              </Link>
              :
              <li className="navbar-toggle" onClick={handleLogout}>
                <span id="welcome-msg">Welcome, {getUserName()}</span>
                <Link to="/" id="logout-btn">
                  <span className="fa fa-sign-out" aria-hidden="true" title="Logout"></span>
                </Link>
              </li>
            }
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" >
            <li className="navbar-toggle" onClick={showSidebar}>
              <Link to="#" className="menu-bars" >
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData
              .filter(item => item.roles.includes(getUserRole()))
              .map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
