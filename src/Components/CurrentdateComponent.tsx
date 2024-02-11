import React from "react";

import {
  writeGregorianDate,
  writeIslamicDate,
} from "../common/CalendarCalculations";

function CurrentDateComponent() {
  return (
    <div className="bg-color-div main-section-container">
      <div className="disp-flex main-section-current-date">
        <h3>
          {writeIslamicDate()} <br /> {writeGregorianDate()}
        </h3>
      </div>
    </div>
  );
}

export default CurrentDateComponent;
