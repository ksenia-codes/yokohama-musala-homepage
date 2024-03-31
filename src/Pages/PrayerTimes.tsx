import React from "react";

// components
import PrayerTimesTableComponent from "../Components/PrayerTimesTableComponent";

function PrayerTimes() {
  return (
    <div className="page-container">
      <h2>Monthly prayer timetable</h2>
      <div className="page-content-container">
        <div>Location: Yokohama</div>
        <div>Calculation method: Muslim World Leage</div>
        <PrayerTimesTableComponent></PrayerTimesTableComponent>
      </div>
    </div>
  );
}

export default PrayerTimes;
