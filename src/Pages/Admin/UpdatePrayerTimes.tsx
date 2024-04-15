import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getDocs, setDoc, doc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "../../firebase/firebase";
import Login from "../Login";
import UpdatePrayerTimesComponent from "../../Components/Admin/UpdatePrayerTimesComponent";
import { IPrayers } from "../../common/Interfaces";
import {
  HeaderContext,
  HeaderContextType,
} from "../../common/context/HeaderContext";
import { PAGE_NAMES } from "../../common/Const";

function UpdatePrayerTimes() {
  enum ScreenMode {
    edit = "edit",
    view = "view",
  }

  enum Prayers {
    fajr = "Fajr",
    dhuhr = "Dhuhr",
    asr = "Asr",
    maghreb = "Maghreb",
    isha = "Isha",
    jummah = "Jummah",
  }

  const [user] = useAuthState(auth);

  // useContext
  const { updateActiveTab } = useContext(HeaderContext) as HeaderContextType;

  // useState
  const [prayersData, setPrayersData] = useState([] as IPrayers[]);
  const [mode, setMode] = useState(ScreenMode.view);
  const [fajr, setFajr] = useState("");
  const [dhuhr, setDhuhr] = useState("");
  const [asr, setAsr] = useState("");
  const [maghreb, setMaghreb] = useState("");
  const [isha, setIsha] = useState("");
  const [jummah, setJummah] = useState("");

  // useEffect
  useEffect(() => {
    updateActiveTab(PAGE_NAMES.admin);

    fetchPrayersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPrayersData = async () => {
    const collectionRef = collection(db, "prayer_times_daily_tbl");
    const prayersSnapshot = await getDocs(collectionRef);
    const prayers = prayersSnapshot.docs.map((doc) => ({
      id: Number(doc.id),
      ...doc.data(),
    })) as IPrayers[];
    if (prayers) {
      setPrayersData(prayers);
      prayers.forEach((prayer: IPrayers) => {
        setTimeValue(prayer.prayer, prayer.time);
      });
    }
  };

  // handlers
  const onSaveCLick = () => {
    updatePrayerTimes();
  };
  const updatePrayerTimes = async () => {
    const data: IPrayers[] = [
      { id: 1, prayer: Prayers.fajr, time: fajr },
      { id: 2, prayer: Prayers.dhuhr, time: dhuhr },
      { id: 3, prayer: Prayers.asr, time: asr },
      { id: 4, prayer: Prayers.maghreb, time: maghreb },
      { id: 5, prayer: Prayers.isha, time: isha },
      { id: 6, prayer: Prayers.jummah, time: jummah },
    ];

    data.forEach(async (prayer) => {
      await setDoc(doc(db, "prayer_times_daily_tbl", String(prayer.id)), {
        prayer: prayer.prayer,
        time: prayer.time,
      });
    });

    setMode(ScreenMode.view);
    setPrayersData(data);
  };

  const onCancelClick = () => {
    setMode(ScreenMode.view);
  };

  const onEditClick = () => {
    setMode(ScreenMode.edit);
    dayjs(fajr, "HH:mm");
  };

  const setTimeValue = (prayer: string, newValue: string) => {
    switch (prayer) {
      case Prayers.fajr:
        setFajr(newValue);
        break;
      case Prayers.dhuhr:
        setDhuhr(newValue);
        break;
      case Prayers.asr:
        setAsr(newValue);
        break;
      case Prayers.maghreb:
        setMaghreb(newValue);
        break;
      case Prayers.isha:
        setIsha(newValue);
        break;
      case Prayers.jummah:
        setJummah(newValue);
        break;
    }
  };
  const onTimeValueChanged = (prayer: string, newValue: string) => {
    setTimeValue(prayer, newValue);
  };

  dayjs.extend(customParseFormat);

  return user ? (
    <div className="admin-page-container">
      <div className="admin-page-content upd-prayer-times">
        <h2>Edit prayer times</h2>
        <div className="disp-flex buttons">
          <div
            className={`button ${mode === ScreenMode.view ? "visible" : ""} `}
            onClick={onEditClick}
          >
            Edit
          </div>
          <div
            className={`button ${mode === ScreenMode.edit ? "visible" : ""} `}
            onClick={onSaveCLick}
          >
            Save
          </div>
          <div
            className={`button ${mode === ScreenMode.edit ? "visible" : ""} `}
            onClick={onCancelClick}
          >
            Cancel
          </div>
        </div>
        <div className="disp-flex prayer-times">
          {prayersData.map((prayer: IPrayers) => (
            <UpdatePrayerTimesComponent
              prayer={prayer.prayer}
              time={prayer.time}
              mode={mode}
              onTimeValueChanged={(newValue: string) =>
                onTimeValueChanged(prayer.prayer, newValue)
              }
              key={prayer.prayer}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Login />
  );
}

export default UpdatePrayerTimes;
