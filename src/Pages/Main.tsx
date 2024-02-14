import React, { useContext, useEffect } from "react";

// components
import { HeaderContext, HeaderContextType } from "../styles/HeaderContext";
import { PAGE_NAMES } from "../common/Const";
import AboutUsComponent from "../components/AboutUsComponent";
import NewsComponent from "../components/NewsComponent";
import CurrentDateComponent from "../components/CurrentdateComponent";
import PrayerTimesTodayComponent from "../components/PrayerTimesTodayComponent";
import DonationsComponent from "../components/DonationsComponent";

import musalaMainImage from "../images/yokohama_musala_inside.png";

function Main() {
  // useContext
  const { updateActiveTab } = useContext(HeaderContext) as HeaderContextType;

  // useEffect
  useEffect(() => {
    updateActiveTab(PAGE_NAMES.aboutUs);
  }, []);

  return (
    <div>
      <div className="main-image-container">
        <img
          className="main-image"
          src={musalaMainImage}
          alt="Yokohama Musala"
        />
        <div className="main-image-text">Yokohama Musala</div>
      </div>
      <div className="main-container">
        <div className="main-container-left">
          <AboutUsComponent></AboutUsComponent>
          <NewsComponent></NewsComponent>
        </div>
        <div className="main-container-right">
          <CurrentDateComponent></CurrentDateComponent>
          <PrayerTimesTodayComponent></PrayerTimesTodayComponent>
          <DonationsComponent></DonationsComponent>
        </div>
      </div>
    </div>
  );
}

export default Main;
