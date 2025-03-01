import React, { useState } from "react";

export const StatpdfCards = ({ data, pagesInMachine, setPagesInMachine }) => {
  // State to track the number of pages in the machine

  // Function to calculate total colored files
  function totalColoredFiles() {
    let sum = 0;
    data.pdfs?.forEach((elem) => {
      if (!elem.isPrinted) {
        sum += elem.pdfDetails.totalFilesColored;
      }
    });
    return sum;
  }

  // Function to calculate total black-and-white files
  function totalBlackAndWhiteFiles() {
    let sum = 0;
    data.pdfs?.forEach((elem) => {
      if (!elem.isPrinted) {
        sum += elem.pdfDetails.totalFilesBlackAndWhite;
      }
    });
    return sum;
  }

  // Function to calculate total files (colored + black-and-white)
  function totalFiles() {
    let sum = 0;
    data.pdfs?.forEach((elem) => {
      if (!elem.isPrinted) {
        sum +=
          elem.pdfDetails.totalFilesColored +
          elem.pdfDetails.totalFilesBlackAndWhite;
      }
    });
    return sum;
  }

  // Get today's date in "MMM D" format (e.g., "Feb 20")
  const todayDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <>
      {/* Card for Colored Files */}
      <Card
        title="Colored Files"
        value={(data) ? totalColoredFiles() : 0}
        trendColor="#33FF57" // Reddish color for Colored Files
        period={todayDate}
      />

      {/* Card for Black-and-White Files */}
      <Card
        title="Black and White Files"
        value={(data) ? totalBlackAndWhiteFiles() : 0}
        trendColor="#000" // Greenish color for Black-and-White Files
        period={todayDate}
      />

      {/* Card for Total Files */}
      <Card
        title="Total Files"
        value={(data) ? totalFiles() : 0}
        trendColor="#3357FF" // Bluish color for Total Files
        period={todayDate}
      />

      {/* New Card for Pages in Machine */}
      <div className="col-span-12 p-4 rounded border border-stone-300">
        <div className="flex mb-8 items-start justify-between">
          <div>
            <h3 className="text-stone-500 mb-2 text-sm">Pages in Machine</h3>
            <input
              type="number"
              placeholder="Enter pages"
              value={pagesInMachine}
              onChange={(e) => setPagesInMachine(e.target.value)}
              className="border border-stone-300 rounded px-2 py-1 w-full text-lg font-semibold outline-none"
            />
          </div>
          {/* Trend Indicator */}
          <div
            style={{ backgroundColor: "#FFA500" }} // Orange color for Pages in Machine
            className="w-4 h-4 rounded-full"
          ></div>
        </div>
        <p className="text-xs text-stone-500">Period: {todayDate}</p>
      </div>
    </>
  );
};

// Card Component
const Card = ({ title, value, trendColor, period }) => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
        {/* Trend Indicator */}
        <div
          style={{ backgroundColor: trendColor }}
          className="w-4 h-4 rounded-full"
        ></div>
      </div>
      <p className="text-xs text-stone-500">Period: {period}</p>
    </div>
  );
};