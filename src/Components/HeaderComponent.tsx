import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HeaderTabComponent from "./HeaderTabComponent";
import AdminHeaderTabComponent from "./Admin/AdminHeaderTabComponent";
import { supabase } from "../supabase";
import { Session } from "@supabase/supabase-js";
import { PAGE_NAMES } from "../common/Const";
import logo from "../images/yokohama_musala_logo.png";

function HeaderComponent() {
  // useState
  const [session, setSession] = useState<Session | null>(null);
  const [visible, setVisible] = useState("");
  const [activeHamburger, setActiveHamburger] = useState("");

  // useEffect
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

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

  const handleSignOutOnClick = () => {
    supabase.auth.signOut();
    navigate("/");
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
          <HeaderTabComponent
            pageName={PAGE_NAMES.home}
            tabName="Home"
            onClick={handleHeaderTabOnClick}
          />
          <HeaderTabComponent
            pageName={PAGE_NAMES.news}
            tabName="News"
            onClick={handleHeaderTabOnClick}
          />
          <HeaderTabComponent
            pageName={PAGE_NAMES.services}
            tabName="Services"
            onClick={handleHeaderTabOnClick}
          />
          <HeaderTabComponent
            pageName={PAGE_NAMES.prayerTimes}
            tabName="Prayer Times"
            onClick={handleHeaderTabOnClick}
          />
          <HeaderTabComponent
            pageName={PAGE_NAMES.contact}
            tabName="Contact"
            onClick={handleHeaderTabOnClick}
          />
          <HeaderTabComponent
            pageName={PAGE_NAMES.access}
            tabName="Access"
            onClick={handleHeaderTabOnClick}
          />

          <AdminHeaderTabComponent
            pageName={PAGE_NAMES.admin}
            tabName="Admin"
            onClick={handleHeaderTabOnClick}
            session={session}
            children={[
              <AdminHeaderTabComponent
                key={PAGE_NAMES.adminNews}
                pageName={PAGE_NAMES.adminNews}
                tabName="Edit news"
                onClick={handleHeaderTabOnClick}
                session={session}
              />,
              <AdminHeaderTabComponent
                key={PAGE_NAMES.adminPrayers}
                pageName={PAGE_NAMES.adminPrayers}
                tabName="Edit prayer times"
                onClick={handleHeaderTabOnClick}
                session={session}
              />,
              <li key={"signout"} onClick={handleSignOutOnClick}>
                Sign out
              </li>,
            ]}
          />
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
