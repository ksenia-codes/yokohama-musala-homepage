import React, { useContext, useEffect } from "react";

// components
import {
  HeaderContext,
  HeaderContextType,
} from "../common/context/HeaderContext";
import { PAGE_NAMES } from "../common/Const";
import AboutUsComponent from "../Components/AboutUsComponent";
import NewsComponent from "../Components/NewsComponent";
import CurrentDateComponent from "../Components/CurrentdateComponent";
import PrayerTimesTodayComponent from "../Components/PrayerTimesTodayComponent";
import DonationsComponent from "../Components/DonationsComponent";

import musalaMainImage from "../images/yokohama_musala_inside.png";

function Main() {
  // useContext
  const { updateActiveTab } = useContext(HeaderContext) as HeaderContextType;

  // useEffect
  useEffect(() => {
    updateActiveTab(PAGE_NAMES.home);
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
          <NewsComponent
            containerClassName="main-section"
            className="main-section-news"
            pageName={PAGE_NAMES.home}
          />
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
