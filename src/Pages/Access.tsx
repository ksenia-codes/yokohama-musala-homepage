import React, { useContext, useEffect } from "react";

// components
import {
  HeaderContext,
  HeaderContextType,
} from "../common/context/HeaderContext";
import { PAGE_NAMES } from "../common/Const";

function Access() {
  // useContext
  const { updateActiveTab } = useContext(HeaderContext) as HeaderContextType;

  // useEffect
  useEffect(() => {
    updateActiveTab(PAGE_NAMES.access);
  }, []);

  return (
    <div className="page-container">
      <h2>Access</h2>
      <div className="page-content-container">
        <div>
          <h3>Address</h3>
          <div>
            <div>
              TTMG, 2-7-6, Kitasaiwai, Nishi-ku, Yokohama, Kanagawa 220-0004,
              Japan
            </div>
            <div>15 minutes walk from Yokohama station</div>
            <div>
              ※ There is no parking available, so if you're coming by car,
              please, use a coin parking.
            </div>
          </div>
          <div>
            <h3>Access map</h3>
            <div className="disp-flex">
              <iframe
                title="Access map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12998.20092361736!2d139.6088266!3d35.4659278!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185be90cf56fff%3A0xa3cabe987388bf2c!2sYOKOHAMA%20MUSALAH!5e0!3m2!1sen!2sjp!4v1707315935244!5m2!1sen!2sjp"
                width="600"
                height="450"
                style={{
                  border: 0,
                  borderRadius: "10px",
                  width: "40%",
                  height: "auto",
                }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div>
                Here we can add a picture of the entrance or some directions?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Access;
