import React, { useContext, useEffect } from "react";

// components
import { HeaderContext, HeaderContextType } from "../styles/HeaderContext";
import { PAGE_NAMES } from "../common/Const";

function PrayerTimes() {
  // useContext
  const { updateActiveTab } = useContext(HeaderContext) as HeaderContextType;

  // useEffect
  useEffect(() => {
    updateActiveTab(PAGE_NAMES.prayerTimes);
  }, []);

  return (
    <div className="page-container">
      <h2>Prayer times</h2>
      <div>
        Here will be a list of monthly prayer times, including a downloadable
        pdf
      </div>
    </div>
  );
}

export default PrayerTimes;
