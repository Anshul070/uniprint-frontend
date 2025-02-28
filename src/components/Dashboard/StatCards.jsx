import React from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export const StatCards = ({data}) => {
  let charges = 10;

  function coloredFiles() {
    let sum = 0;
    data.payments?.forEach((elem) => {
      sum += elem.userPdf?.pdfDetails.totalPagesColored * data.serviceCost.colored + (elem.userPdf?.pdfDetails.totalPagesColored * data.serviceCost.colored) / 100 * charges;
    });
    data.pdfs?.forEach((elem) => {
      if(elem.isPrinted && (elem.payment === null || elem.payment === "")){
        sum += elem.pdfDetails.totalPagesColored * data.serviceCost.colored + (elem.pdfDetails.totalPagesColored * data.serviceCost.colored) / 100 * charges;
      }
    })
    return sum;
  }
  function blackAndWhiteFiles() {
    let sum = 0;
    data.payments?.forEach((elem) => {
      sum += elem.userPdf?.pdfDetails.totalPagesBlackAndWhite * data.serviceCost.blackAndWhite + (elem.userPdf?.pdfDetails.totalPagesBlackAndWhite * data.serviceCost.blackAndWhite) / 100 * charges;
    });
    data.pdfs?.forEach((elem) => {
      if(elem.isPrinted && (elem.payment === null || elem.payment === "")){
        sum += elem.pdfDetails.totalPagesBlackAndWhite * data.serviceCost.blackAndWhite + (elem.pdfDetails.totalPagesBlackAndWhite * data.serviceCost.blackAndWhite) / 100 * charges;
      }
    })
    return sum;
  }
  function totalFiles() {
    let sum = coloredFiles() + blackAndWhiteFiles();
    return sum;
  }

  
  
  return (
    <>
      <Card
        title="Colored Revenue"
        value={`₹${(data) ? coloredFiles() : 0}`}
        pillText="2.75%"
        trend="up"
        period={(data) ? getPaymentRange(data.payments) : 0}
      />
      <Card
        title="Black And White Revenue"
        value={`₹${(data) ? blackAndWhiteFiles() : 0}`}
        pillText="1.01%"
        trend="down"
        period={(data) ? getPaymentRange(data.payments) : 0}
      />
      <Card
        title="Overall Revenue"
        value={`₹${(data) ? totalFiles() : 0}`}
        pillText="60.75%"
        trend="up"
        period={(data) ? getPaymentRange(data.payments) : 0}
      />
    </>
  );
};

const Card = ({
  title,
  value,
  period,
}) => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>

      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};


function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: "short", day: "numeric" }; // Format: "Jan 1"
  return date.toLocaleDateString("en-US", options);
}

// Function to get the payment range
function getPaymentRange(payments) {
  if (!payments || payments.length === 0) {
    return "No payments available.";
  }

  // Extract all createdAt dates
  const dates = payments.map(payment => new Date(payment.createdAt));

  // Find the earliest and latest dates
  const earliestDate = new Date(Math.min(...dates));
  const latestDate = new Date(Math.max(...dates));

  // Format the dates
  const formattedEarliest = formatDate(earliestDate);
  const formattedLatest = formatDate(latestDate);

  // Return the range
  return `${formattedEarliest} to ${formattedLatest}`;
}
