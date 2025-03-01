import React, { useContext } from "react";
import { FiCalendar } from "react-icons/fi";
import { shopData } from "../context/shopContext";
import { LuRefreshCcw } from "react-icons/lu";
import { motion } from "framer-motion";

export const TopBar = () => {
  const { fetchData, handleManualRefetch, manualRefetch } = useContext(shopData);
  const data = fetchData;
  console.log(manualRefetch);

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
    return monthNames[date.getMonth()];
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
    if (todayDate === "01") {
      dateString = "1st";
    } else if (todayDate === "02") {
      dateString = "2nd";
    } else if (todayDate === "03") {
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

  // Animation configuration for the refresh icon
  const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
  };

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
          {/* Refresh Button */}
          <button
            onClick={handleManualRefetch}
            className="px-8 py-2 rounded bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700"
          >
            {/* Animated Refresh Icon */}
            <motion.div
              animate={manualRefetch ? { rotate: 1240 } : { rotate: 0 }}
              transition={spinTransition}
            >
              <LuRefreshCcw />
            </motion.div>
          </button>

          {/* Calendar Button */}
          <button className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded">
            <FiCalendar />
            <span>1 Month</span>
          </button>
        </div>
      </div>
    </div>
  );
};