import React, { useContext } from "react";
import { FiCalendar } from "react-icons/fi";
import { shopData } from "../context/shopContext";
import { LuRefreshCcw } from "react-icons/lu";

export const TopBar = () => {
  const { fetchData, handleManualRefetch } = useContext(shopData);
  const data = fetchData;
  const getMonth = (date) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[date.getMonth() - 1];
  };

  const getDay = (date) => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekdays[date.getDay()];
  };

  const getTodayDate = (date) => {
    const todayDate = date.getDate().toString().padStart(2, "0");
    let dateString = "";
    if (todayDate === 1) {
      dateString = "1st";
    } else if (todayDate === 2) {
      dateString = "2nd";
    } else if (todayDate === 3) {
      dateString = "3rd";
    } else {
      dateString = `${todayDate}th`;
    }
    return dateString;
  };
  function getDate() {
    let date = new Date();
    const year = date.getFullYear().toString();
    const month = getMonth(date);
    const day = getDay(date);
    const todayDate = getTodayDate(date);
    const dateString = `${day}, ${month} ${todayDate}, ${year}`;
    return dateString;
  }
  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">
            🚀 Good morning, {data ? data.ownerName : ""}
          </span>
          <span className="text-xs block text-stone-500">{getDate()}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleManualRefetch}
            className="px-8 py-2 rounded bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700">
            <LuRefreshCcw />
          </button>
          <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
            <FiCalendar />
            <span>1 Month</span>
          </button>
        </div>
      </div>
    </div>
  );
};
