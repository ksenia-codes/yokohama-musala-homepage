import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import UpdatePrayerTimesComponent from "../../components/Admin/UpdatePrayerTimesComponent";

import { supabase } from "../../supabase";
import { IPrayers } from "../../common/Interfaces";

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
    fetchPrayersData().then((data) => {
      setPrayersData(data);
      data.map((prayer: IPrayers) => {
        setTimeValue(prayer.prayer, prayer.time);
      });
    });
  }, []);

  const fetchPrayersData = async () => {
    const { data } = await supabase.from("prayer_times_daily_tbl").select();
    if (data !== null) {
      return data[0].prayer_times;
    }
  };

  // handlers
  const onSaveCLick = () => {
    updatePrayerTimes();
  };
  const updatePrayerTimes = async () => {
    const data: IPrayers[] = [
      { prayer: Prayers.fajr, time: fajr },
      { prayer: Prayers.dhuhr, time: dhuhr },
      { prayer: Prayers.asr, time: asr },
      { prayer: Prayers.maghreb, time: maghreb },
      { prayer: Prayers.isha, time: isha },
      { prayer: Prayers.jummah, time: jummah },
    ];

    const { error } = await supabase
      .from("prayer_times_daily_tbl")
      .update({ prayer_times: data })
      .eq("id", 1);

    // if failed, log the error and stay on the edit mode
    if (error) {
      console.log("Fetch error:", error.message);
      return;
    }
    // otherwise switch modes
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

  return (
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
        <div className="prayer-times">
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
  );
}

export default UpdatePrayerTimes;
