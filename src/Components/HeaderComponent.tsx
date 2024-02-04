import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeaderComponent() {
  // useState
  const [visible, setVisible] = useState("");
  const [active, setActive] = useState("");

  // handlers
  const handleHamburgerOnClick = () => {
    if (active === "active") {
      setActive("");
      setVisible("");
    } else {
      setActive("active");
      setVisible("visible");
    }
  };

  // useNavigate
  let navigate = useNavigate();
  const handleHeaderTabOnClick = (path: string) => {
    navigate(path);
  };

  return (
    <header>
      <nav className={`topnav disp-flex ${visible}`}>
        <div
          className="logo hover-cursor"
          onClick={() => handleHeaderTabOnClick("/")}
        >
          YM
        </div>
        <ul>
          <li
            className="hover-cursor"
            onClick={() => handleHeaderTabOnClick("/")}
          >
            About us
          </li>
          <li
            className="hover-cursor"
            onClick={() => handleHeaderTabOnClick("/news")}
          >
            News
          </li>
          <li
            className="hover-cursor"
            onClick={() => handleHeaderTabOnClick("/services")}
          >
            Services
          </li>
          <li
            className="hover-cursor"
            onClick={() => handleHeaderTabOnClick("/prayertimes")}
          >
            Prayer Times
          </li>
          <li
            className="hover-cursor"
            onClick={() => handleHeaderTabOnClick("/contact")}
          >
            Contact
          </li>
          <li
            className="hover-cursor"
            onClick={() => handleHeaderTabOnClick("/access")}
          >
            Access
          </li>
        </ul>
        <div
          className={`hover-cursor topnav-hamburger ${active}`}
          onClick={handleHamburgerOnClick}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderComponent;
