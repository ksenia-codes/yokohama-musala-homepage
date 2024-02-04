import React from "react";

function PrayerTimesTodayComponent() {
  return (
    <div className="bg-color-div pd-btm-0 main-section-container">
      <h3>Iqama</h3>
      <div className="disp-flex main-section-prayer-time">
        <div className="main-section-prayer">Fajr</div>
        <div className="main-section-time">5:35</div>
      </div>
      <div className="disp-flex main-section-prayer-time">
        <div className="main-section-prayer">Dhuhr</div>
        <div className="main-section-time">12:30</div>
      </div>
      <div className="disp-flex main-section-prayer-time">
        <div className="main-section-prayer">Asr</div>
        <div className="main-section-time">15:00</div>
      </div>
      <div className="disp-flex main-section-prayer-time">
        <div className="main-section-prayer">Maghreb</div>
        <div className="main-section-time">5min after Azan</div>
      </div>
      <div className="disp-flex main-section-prayer-time">
        <div className="main-section-prayer">Isha</div>
        <div className="main-section-time">20:00</div>
      </div>
      <div className="disp-flex jummah-time-container">
        <div className="jummah-time-title">Friday Prayer</div>
        <div className="jummah-time">12:45</div>
      </div>
    </div>
  );
}

export default PrayerTimesTodayComponent;
