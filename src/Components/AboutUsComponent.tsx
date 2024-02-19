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
          <div className="main-about-us-address">
            <h4>Address</h4>
            TTMG, 2-7-6, Kitasaiwai, Nishi-ku, Yokohama, Kanagawa 220-0004,
            Japan
          </div>
        </div>
        <div className="main-map-access">
          <iframe
            title="Access map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12998.20092361736!2d139.6088266!3d35.4659278!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185be90cf56fff%3A0xa3cabe987388bf2c!2sYOKOHAMA%20MUSALAH!5e0!3m2!1sen!2sjp!4v1707315935244!5m2!1sen!2sjp"
            width="600"
            height="450"
            style={{
              border: 0,
              width: "100%",
              height: "100%",
              borderRadius: "10px",
            }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default AboutUsComponent;
