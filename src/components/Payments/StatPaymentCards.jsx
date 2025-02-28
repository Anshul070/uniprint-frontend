import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";

export const StatPaymentCards = ({ data }) => {
  // Function to calculate the total number of payments (online + offline)
  function totalPayments() {
    const onlinePaymentsCount = Array.isArray(data?.payments) ? data.payments.length : 0;

    const offlinePaymentsCount = Array.isArray(data?.pdfs)
      ? data.pdfs.filter(
          (pdf) => pdf.isPrinted === true && (!pdf.payment || pdf.payment.trim() === "")
        ).length
      : 0;

    return onlinePaymentsCount + offlinePaymentsCount;
  }

  // Function to calculate the total money from all payments (online + offline)
  function totalMoney() {
    let onlineMoney = 0;
    if (Array.isArray(data?.payments)) {
      data.payments.forEach((payment) => {
        onlineMoney += payment.shopAmount; // Summing up the shopAmount field from each online payment
      });
    }

    let offlineMoney = 0;
    if (Array.isArray(data?.pdfs)) {
      data.pdfs
        .filter(
          (pdf) => pdf.isPrinted === true && (!pdf.payment || pdf.payment.trim() === "")
        )
        .forEach((pdf) => {
          offlineMoney += pdf.pdfDetails.totalCost; // Summing up the totalCost field from each offline payment
        });
    }

    return onlineMoney + offlineMoney;
  }

  // Get today's date in "MMM D" format (e.g., "Feb 27")
  const todayDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <>
      {/* Card for Total Number of Payments */}
      <Card
        title="Total Transactions"
        value={data ? totalPayments() : 0}
        trendIcon={<GrTransaction />} // Greenish color for Total Payments
        period={todayDate}
      />
      {/* Card for Total Money */}
      <Card
        title="Total Money"
        value={`₹${data ? totalMoney() : 0}`} // Adding ₹ symbol for currency representation
        trendIcon={<FaMoneyBillWave />} // Bluish color for Total Money
        period={todayDate}
      />
    </>
  );
};

// Card Component
const Card = ({ title, value, trendIcon, period }) => {
  return (
    <div className="col-span-6 p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
        {/* Trend Indicator */}
        <div
          className="w-10 h-10 text-white text-xl rounded bg-zinc-700 flex items-center justify-center"
        >
          {trendIcon}
        </div>
      </div>
      <p className="text-xs text-stone-500">Period: {period}</p>
    </div>
  );
};