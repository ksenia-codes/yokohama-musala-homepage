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

  // useState
  const [prayersData, setPrayersData] = useState([] as IPrayers[]);
  const [mode, setMode] = useState(ScreenMode.edit);
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

  async function fetchPrayersData() {
    const { data } = await supabase.from("prayer_times_daily_tbl").select();
    if (data !== null) {
      return data[0].prayer_times;
    }
  }

  // handlers
  const onSaveCLick = () => {
    setMode(ScreenMode.view);
  };
  const onCancelClick = () => {
    setMode(ScreenMode.view);
  };

  const onEditClick = () => {
    setMode(ScreenMode.edit);
    dayjs(fajr, "HH:mm");
  };

  const setTimeValue = (newValue: string, prayer: string) => {
    switch (prayer) {
      case "fajr":
        setFajr(newValue);
        break;
      case "dhuhr":
        setDhuhr(newValue);
        break;
      case "asr":
        setAsr(newValue);
        break;
      case "maghreb":
        setMaghreb(newValue);
        break;
      case "isha":
        setIsha(newValue);
        break;
      case "jummah":
        setJummah(newValue);
        break;
    }
  };
  const onTimeValueChanged = (newValue: string, prayer: string) => {
    setTimeValue(newValue, prayer);
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
                onTimeValueChanged(newValue, "")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UpdatePrayerTimes;
