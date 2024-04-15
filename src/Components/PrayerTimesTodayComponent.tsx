import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";

import { db } from "../firebase/firebase";
import { IPrayers } from "../common/Interfaces";

function PrayerTimesTodayComponent() {
  // useState
  const [prayersData, setPrayersData] = useState([] as IPrayers[]);

  // useEffect
  useEffect(() => {
    fetchPrayersData();
  }, []);

  async function fetchPrayersData() {
    const collectionRef = collection(db, "prayer_times_daily_tbl");
    const prayersSnapshot = await getDocs(collectionRef);
    const prayers = prayersSnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as IPrayers[];
    if (prayers) {
      setPrayersData(prayers);
    }
  }

  return (
    <div className="bg-color-div pd-btm-0 main-section-container">
      <h3>Iqama</h3>
      {prayersData
        .filter((prayer) => prayer.prayer !== "Jummah")
        .map((prayer) => (
          <div
            className="disp-flex main-section-prayer-time"
            key={prayer.prayer}
          >
            <div className="main-section-prayer">{prayer.prayer}</div>
            <div className="main-section-time">{prayer.time}</div>
          </div>
        ))}
      {prayersData
        .filter((prayer) => prayer.prayer === "Jummah")
        .map((prayer) => (
          <div className="disp-flex jummah-time-container" key={prayer.prayer}>
            <div className="main-section-prayer">{prayer.prayer}</div>
            <div className="main-section-time">{prayer.time}</div>
          </div>
        ))}
    </div>
  );
}

export default PrayerTimesTodayComponent;
