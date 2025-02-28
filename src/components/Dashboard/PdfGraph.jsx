import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import { FaRegFilePdf } from "react-icons/fa";

// Function to process payments (both online and offline) and group by day of the week
function getGraphData(data) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const groupedData = {};

  // Initialize data for all days
  daysOfWeek.forEach((day) => {
    groupedData[day] = { name: day, BlackAndWhite: 0, colored: 0 };
  });

  // Process online payments
  const onlinePayments = Array.isArray(data?.payments)
    ? data.payments.map((payment) => ({
        ...payment,
        mode: "Online",
      }))
    : [];

  // Process offline payments
  const offlinePayments = Array.isArray(data?.pdfs)
    ? data.pdfs
        .filter(
          (pdf) =>
            pdf.isPrinted === true &&
            (!pdf.payment || pdf.payment.trim() === "")
        )
        .map((pdf) => ({
          userPdf: pdf,
          mode: "Offline",
        }))
    : [];

  // Combine online and offline payments
  const allPayments = [...onlinePayments, ...offlinePayments];

  // If there are no payments, return the initialized data
  if (allPayments.length === 0) {
    return Object.values(groupedData);
  }

  // Process all payments
  allPayments.forEach((payment) => {
    // Check if userPdf, pdfDetails, and createdAt exist
    if (
      payment.userPdf &&
      payment.userPdf.pdfDetails &&
      payment.userPdf.createdAt &&
      !isNaN(new Date(payment.userPdf.createdAt).getTime()) // Ensure valid date
    ) {
      const date = new Date(payment.userPdf.createdAt);
      const day = daysOfWeek[date.getUTCDay()]; // Get the day of the week

      // Add black-and-white and colored page counts
      groupedData[day].BlackAndWhite +=
        payment.userPdf.pdfDetails.totalPagesBlackAndWhite || 0;
      groupedData[day].colored += payment.userPdf.pdfDetails.totalPagesColored || 0;
    } else {
      console.warn("Invalid payment data:", payment); // Log problematic entries for debugging
    }
  });

  // Convert grouped data into an array
  return Object.values(groupedData);
}

export const PdfGraph = ({ data }) => {
  // Process the data
  const graphData = getGraphData(data);

  // Check if the combined payments array is empty
  const isEmpty = graphData.every((day) => day.BlackAndWhite === 0 && day.colored === 0);

  return (
    <div className="col-span-12 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FaRegFilePdf /> PDFs
        </h3>
      </div>
      <div className="h-64 px-4">
        {isEmpty ? (
          // Display a message if there are no payments
          <div className="flex justify-center items-center h-full text-stone-500">
            No data available
          </div>
        ) : (
          // Render the graph if there are payments
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={graphData}
              margin={{
                top: 0,
                right: 0,
                left: -24,
                bottom: 0,
              }}
            >
              <CartesianGrid stroke="#e4e4e7" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                className="text-xs font-bold"
                padding={{ right: 4 }}
              />
              <YAxis
                className="text-xs font-bold"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                wrapperClassName="text-sm rounded"
                labelClassName="text-xs text-stone-500"
              />
              <Line
                type="monotone"
                dataKey="BlackAndWhite"
                stroke="#18181b"
                fill="#18181b"
              />
              <Line
                type="monotone"
                dataKey="colored"
                stroke="#5b21b6"
                fill="#5b21b6"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};