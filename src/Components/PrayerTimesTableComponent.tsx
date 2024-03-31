import React, { useContext, useEffect, useState } from "react";

// components
import {
  HeaderContext,
  HeaderContextType,
} from "../common/context/HeaderContext";
import { PAGE_NAMES } from "../common/Const";

function PrayerTimesTableComponent() {
  const today = new Date();

  // useContext
  const { updateActiveTab } = useContext(HeaderContext) as HeaderContextType;

  // useState
  const [prayerTimesData, setPrayerTimesData] = useState([]);
  const [dateDisplayed, setDateDisplayed] = useState(today);

  // useEffect
  useEffect(() => {
    updateActiveTab(PAGE_NAMES.prayerTimes);

    fetchData(dateDisplayed.getFullYear(), dateDisplayed.getMonth() + 1);
  }, []);

  const fetchData = async (year: number, month: number) => {
    const data = await fetch(
      `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=Yokohama&country=Japan&method=3`
    );
    const dataRes = await data.json();

    setPrayerTimesData(dataRes.data);
  };

  const handlePrevMonthOnClick = () => {
    dateDisplayed.setMonth(dateDisplayed.getMonth() - 1);
    setDateDisplayed(dateDisplayed);
    fetchData(dateDisplayed.getFullYear(), dateDisplayed.getMonth() + 1);
  };

  const handleNextMonthOnClick = () => {
    dateDisplayed.setMonth(dateDisplayed.getMonth() + 1);
    setDateDisplayed(dateDisplayed);
    fetchData(dateDisplayed.getFullYear(), dateDisplayed.getMonth() + 1);
  };

  return (
    <div className="disp-flex prayer-timetable-container">
      <div className="inner-contents">
        <div className="disp-flex prayer-timetable-month-header">
          <h3
            className="hover-cursor prayer-timetable-month-arrow"
            onClick={() => handlePrevMonthOnClick()}
          >
            &#60;
          </h3>
          <h3>
            {dateDisplayed.toLocaleDateString("en-US", { month: "long" })}{" "}
            {dateDisplayed.getFullYear()}
          </h3>
          <h3
            className="hover-cursor prayer-timetable-month-arrow"
            onClick={() => handleNextMonthOnClick()}
          >
            &#62;
          </h3>
        </div>

        <div className="prayer-times-table-container">
          <table className="prayer-times-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Fajr</th>
                <th>Sunrise</th>
                <th>Dhuhr</th>
                <th>Asr</th>
                <th>Maghrib</th>
                <th>Isha</th>
              </tr>
            </thead>
            <tbody>
              {prayerTimesData.map((days: any) => (
                <tr
                  key={days.date.gregorian.day}
                  className={
                    today.getMonth() === dateDisplayed.getMonth() &&
                    today.getDate() === Number(days.date.gregorian.day)
                      ? "prayer-time-today"
                      : ""
                  }
                >
                  <td>{days.date.gregorian.day}</td>
                  <td>{days.timings.Fajr.split(" ", 1)}</td>
                  <td>{days.timings.Sunrise.split(" ", 1)}</td>
                  <td>{days.timings.Dhuhr.split(" ", 1)}</td>
                  <td>{days.timings.Asr.split(" ", 1)}</td>
                  <td>{days.timings.Maghrib.split(" ", 1)}</td>
                  <td>{days.timings.Isha.split(" ", 1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PrayerTimesTableComponent;
