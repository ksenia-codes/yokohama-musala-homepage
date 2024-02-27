import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

enum ScreenMode {
  edit = "edit",
  view = "view",
}

type Props = {
  prayer: string;
  time: string;
  mode: ScreenMode;
  onTimeValueChanged: (newValue: string) => void;
};

dayjs.extend(customParseFormat);

function UpdatePrayerTimesComponent(props: Props) {
  return (
    <div className="disp-flex prayer">
      <div className="prayer-title">{props.prayer}</div>
      <div
        className={`prayer-text-area ${
          props.mode === ScreenMode.view ? "visible" : ""
        }`}
      >
        {props.time}
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          className={`prayer-text-area ${
            props.mode === ScreenMode.edit ? "visible" : ""
          }`}
          value={dayjs(props.time, "HH:mm")}
          ampm={false}
          onChange={(newValue) => {
            if (newValue === null) return;
            props.onTimeValueChanged(`${newValue.hour()}:${newValue.minute()}`);
          }}
        ></TimePicker>
      </LocalizationProvider>
    </div>
  );
}

export default UpdatePrayerTimesComponent;
