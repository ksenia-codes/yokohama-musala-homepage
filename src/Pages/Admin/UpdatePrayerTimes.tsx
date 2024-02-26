import React, { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import prayerJSON from "../../assets/json/prayerTimes.json";

function UpdatePrayerTimes() {
  // useState
  const [mode, setMode] = useState("edit");
  const [fajr, setFajr] = useState(prayerJSON.fajr);
  const [dhuhr, setDhuhr] = useState(prayerJSON.dhuhr);
  const [asr, setAsr] = useState(prayerJSON.asr);
  const [maghreb, setMaghreb] = useState(prayerJSON.maghreb);
  const [isha, setIsha] = useState(prayerJSON.isha);
  const [jummah, setJummah] = useState(prayerJSON.jummah);

  // handlers
  const onSaveCLick = () => {
    console.log("clicked");
    setMode("view");
  };
  const onCancelClick = () => {
    console.log("clicked");
    setMode("view");
  };

  const onEditClick = () => {
    setMode("edit");
  };

  const onTimeValueChanged = (newValue: string, prayer: string) => {
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

  dayjs.extend(customParseFormat);

  return (
    <div className="admin-page-container">
      <div className="admin-page-content upd-prayer-times">
        <h2>Edit prayer times</h2>
        <div className="disp-flex buttons">
          <div
            className={`button ${mode === "view" ? "visible" : ""} `}
            onClick={onEditClick}
          >
            Edit
          </div>
          <div
            className={`button ${mode === "edit" ? "visible" : ""} `}
            onClick={onSaveCLick}
          >
            Save
          </div>
          <div
            className={`button ${mode === "edit" ? "visible" : ""} `}
            onClick={onCancelClick}
          >
            Cancel
          </div>
        </div>
        <div className="prayer-times">
          <div className="disp-flex prayer">
            <div className="prayer-title">Fajr</div>
            <div
              className={`prayer-text-area ${mode === "view" ? "visible" : ""}`}
            >
              {prayerJSON.fajr}
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                className={`prayer-text-area ${
                  mode === "edit" ? "visible" : ""
                }`}
                value={dayjs(fajr, "HH:mm")}
                ampm={false}
                onChange={(newValue) => {
                  if (newValue === null) return;
                  onTimeValueChanged(
                    `${newValue.hour()}:${newValue.minute()}`,
                    "fajr"
                  );
                }}
              ></TimePicker>
            </LocalizationProvider>
          </div>
          <div className="disp-flex prayer">
            <div className="prayer-title">Dhuhr</div>
            <div
              className={`prayer-text-area ${mode === "view" ? "visible" : ""}`}
            >
              {prayerJSON.dhuhr}
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                className={`prayer-text-area ${
                  mode === "edit" ? "visible" : ""
                }`}
                value={dayjs(dhuhr, "HH:mm")}
                ampm={false}
              ></TimePicker>
            </LocalizationProvider>
          </div>
          <div className="disp-flex prayer">
            <div className="prayer-title">Asr</div>
            <div
              className={`prayer-text-area ${mode === "view" ? "visible" : ""}`}
            >
              {prayerJSON.asr}
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                className={`prayer-text-area ${
                  mode === "edit" ? "visible" : ""
                }`}
                value={dayjs(asr, "HH:mm")}
                ampm={false}
              ></TimePicker>
            </LocalizationProvider>
          </div>
          <div className="disp-flex prayer">
            <div className="prayer-title">Maghreb</div>
            <div
              className={`prayer-text-area ${mode === "view" ? "visible" : ""}`}
            >
              {prayerJSON.maghreb}
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                className={`prayer-text-area ${
                  mode === "edit" ? "visible" : ""
                }`}
                value={dayjs(maghreb, "HH:mm")}
                ampm={false}
              ></TimePicker>
            </LocalizationProvider>
          </div>
          <div className="disp-flex prayer">
            <div className="prayer-title">Isha</div>
            <div
              className={`prayer-text-area ${mode === "view" ? "visible" : ""}`}
            >
              {prayerJSON.isha}
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                className={`prayer-text-area ${
                  mode === "edit" ? "visible" : ""
                }`}
                value={dayjs(isha, "HH:mm")}
                ampm={false}
              ></TimePicker>
            </LocalizationProvider>
          </div>
          <div className="disp-flex prayer">
            <div className="prayer-title">Jummah</div>
            <div
              className={`prayer-text-area ${mode === "view" ? "visible" : ""}`}
            >
              {prayerJSON.jummah}
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                className={`prayer-text-area ${
                  mode === "edit" ? "visible" : ""
                }`}
                value={dayjs(jummah, "HH:mm")}
                ampm={false}
              ></TimePicker>
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePrayerTimes;
