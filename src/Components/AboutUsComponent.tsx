import React from "react";

import accessMap from "../images/yokohama-musala-access-map.jpg";

function AboutUsComponent() {
  return (
    <div className="bg-color-div main-section-container">
      <h3>About us</h3>
      <div className="disp-flex main-about-us-container">
        <div className="disp-flex main-about-us-text">
          <div>
            Yokohama Musala is a prayer place for Muslims located in Yokohama,
            Kanagawa
          </div>
          <div>
            <h4>Address</h4>
            TTMG, 2-7-6, Kitasaiwai, Nishi-ku, Yokohama, Kanagawa 220-0004,
            Japan
          </div>
        </div>
        <div className="main-map-access">
          {/* TODO: add Google maps here if necessary */}
          <img
            className="main-access-map-image"
            src={accessMap}
            alt="Access map"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUsComponent;
