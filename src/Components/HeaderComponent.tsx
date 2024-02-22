import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { HeaderContext, HeaderContextType } from "../styles/HeaderContext";
import { PAGE_NAMES } from "../common/Const";
import logo from "../images/yokohama_musala_logo.png";

function HeaderComponent() {
  // useState
  const [visible, setVisible] = useState("");
  const [activeHamburger, setActiveHamburger] = useState("");

  // useContext
  const { activeTab } = useContext(HeaderContext) as HeaderContextType;

  // handlers
  const handleHamburgerOnClick = () => {
    if (activeHamburger === "active") {
      setActiveHamburger("");
      setVisible("");
    } else {
      setActiveHamburger("active");
      setVisible("visible");
    }
  };

  // useNavigate
  let navigate = useNavigate();
  const handleHeaderTabOnClick = (path: string) => {
    navigate(`/${path}`);
    setVisible("");
    setActiveHamburger("");
  };

  return (
    <header>
      <nav className={`topnav disp-flex ${visible}`}>
        <img
          src={logo}
          className="logo hover-cursor"
          onClick={() => handleHeaderTabOnClick("")}
          alt="Home"
          width={50}
        />
        <ul>
          <li
            className={`${
              activeTab === PAGE_NAMES.aboutUs
                ? "active hover-cursor"
                : "hover-cursor"
            }`}
            onClick={() => handleHeaderTabOnClick(PAGE_NAMES.aboutUs)}
          >
            Home
          </li>
          <li
            className={`${
              activeTab === PAGE_NAMES.news
                ? "active hover-cursor"
                : "hover-cursor"
            }`}
            onClick={() => handleHeaderTabOnClick(PAGE_NAMES.news)}
          >
            News
          </li>
          <li
            className={`${
              activeTab === PAGE_NAMES.services
                ? "active hover-cursor"
                : "hover-cursor"
            }`}
            onClick={() => handleHeaderTabOnClick(PAGE_NAMES.services)}
          >
            Services
          </li>
          <li
            className={`${
              activeTab === PAGE_NAMES.prayerTimes
                ? "active hover-cursor"
                : "hover-cursor"
            }`}
            onClick={() => handleHeaderTabOnClick(PAGE_NAMES.prayerTimes)}
          >
            Prayer Times
          </li>
          <li
            className={`${
              activeTab === PAGE_NAMES.contact
                ? "active hover-cursor"
                : "hover-cursor"
            }`}
            onClick={() => handleHeaderTabOnClick(PAGE_NAMES.contact)}
          >
            Contact
          </li>
          <li
            className={`${
              activeTab === PAGE_NAMES.access
                ? "active hover-cursor"
                : "hover-cursor"
            }`}
            onClick={() => handleHeaderTabOnClick(PAGE_NAMES.access)}
          >
            Access
          </li>
        </ul>
        <div
          className={`hover-cursor topnav-hamburger ${activeHamburger}`}
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
