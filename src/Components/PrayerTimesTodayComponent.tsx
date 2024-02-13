import React from "react";

import prayerTimesJSON from "../assets/json/prayerTimes.json";

function PrayerTimesTodayComponent() {
  return (
    <div className="bg-color-div pd-btm-0 main-section-container">
      <h3>Iqama</h3>
      <div className="disp-flex main-section-prayer-time">
        <div className="main-section-prayer">Fajr</div>
        <div className="main-section-time">{prayerTimesJSON.fajr}</div>
      </div>
      <div className="disp-flex main-section-prayer-time">
        <div className="main-section-prayer">Dhuhr</div>
        <div className="main-section-time">{prayerTimesJSON.dhuhr}</div>
      </div>
      <div className="disp-flex main-section-prayer-time">
        <div className="main-section-prayer">Asr</div>
        <div className="main-section-time">{prayerTimesJSON.asr}</div>
      </div>
      <div className="disp-flex main-section-prayer-time">
        <div className="main-section-prayer">Maghreb</div>
        <div className="main-section-time">{prayerTimesJSON.maghreb}</div>
      </div>
      <div className="disp-flex main-section-prayer-time">
        <div className="main-section-prayer">Isha</div>
        <div className="main-section-time">{prayerTimesJSON.isha}</div>
      </div>
      <div className="disp-flex jummah-time-container">
        <div className="jummah-time-title">Friday Prayer</div>
        <div className="jummah-time">{prayerTimesJSON.jummah}</div>
      </div>
    </div>
  );
}

export default PrayerTimesTodayComponent;
