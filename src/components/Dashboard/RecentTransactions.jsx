import React, { useState } from "react";
import { FiArrowUpRight, FiMoreHorizontal } from "react-icons/fi";
import { Link } from "react-router";

export const RecentTransactions = ({ data }) => {
  // State to track the selected transaction for detailed view
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Ensure data.payments exists and is an array
  const onlinePayments = Array.isArray(data?.payments)
    ? data.payments.map((payment) => ({
        ...payment,
        mode: "Online", // Add a "mode" field to indicate online payments
      }))
    : [];

  // Extract offline payments from the `pdfs` array
  const offlinePayments = Array.isArray(data?.pdfs)
    ? data.pdfs
        .filter(
          (pdf) =>
            pdf.isPrinted === true &&
            (!pdf.payment || pdf.payment.trim() === "")
        )
        .map((pdf) => ({
          _id: pdf._id,
          shopAmount: pdf.pdfDetails.totalCost, // Use total cost as the payment amount
          userPdf: pdf,
          createdAt: pdf.createdAt,
          mode: "Offline", // Add a "mode" field to indicate offline payments
        }))
    : [];

  const allPayments = [...onlinePayments, ...offlinePayments];

  // Get the last 5 transactions (most recent first)
  const recentPayments = [...allPayments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  // Function to handle opening the detailed view
  const handleOpenDetails = (payment) => {
    setSelectedTransaction(payment);
  };

  // Function to close the detailed view
  const handleCloseDetails = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">₹ Recent Transactions</h3>
        <Link to={"/payments"} className="text-sm text-violet-500 hover:underline">
          See all
        </Link>
      </div>

      {/* Table */}
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {recentPayments.length === 0 && <TableRow hasData={false} />}
          {recentPayments.map((payment) => (
            <TableRow
              key={payment._id}
              hasData={true}
              id={payment._id}
              payment={payment.shopAmount}
              senderName={payment.userPdf?.userName}
              time={new Date(payment.createdAt).toLocaleString()}
              totalPages={payment.userPdf?.pdfDetails.totalPages}
              mode={payment.mode} // Pass the mode (Online/Offline)
              onClick={() => handleOpenDetails(payment)} // Open details on click
            />
          ))}
        </tbody>
      </table>

      {/* Detailed Transaction View */}
      {selectedTransaction && (
        <TransactionDetails
          transaction={selectedTransaction}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

// Table Head Component
const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Sender</th>
        <th className="text-start p-1.5">Total Pages</th>
        <th className="text-start p-1.5">Time</th>
        <th className="text-start p-1.5">Payment</th>
        <th className="text-start p-1.5">Mode</th> {/* New column for Mode */}
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

// Table Row Component
const TableRow = ({
  senderName,
  totalPages,
  time,
  payment,
  mode, // Add mode prop
  id = null,
  hasData,
  onClick,
}) => {
  return (
    <tr
      className={id % 2 ? "bg-stone-100 text-sm" : "text-sm"}
      onClick={onClick} // Handle row click
    >
      <td className="p-1.5 cursor-pointer">
        <span
          onClick={onClick}
          className={`${hasData && 'text-violet-600 underline'} flex items-center gap-1`}
        >
          {hasData ? senderName : "No Data"} {hasData && <FiArrowUpRight />}
        </span>
      </td>
      <td className="p-1.5">{hasData ? totalPages : "No Data"}</td>
      <td className="p-1.5">{hasData ? time : "No Data"}</td>
      <td className="p-1.5">₹{hasData ? payment : "No Data"}</td>
      <td className="p-1.5">{hasData ? mode : "No Data"}</td> {/* Display Mode */}
      <td className="w-8">
        <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
          {hasData && <FiMoreHorizontal />}
        </button>
      </td>
    </tr>
  );
};

// Transaction Details Component
const TransactionDetails = ({ transaction, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-2 text-stone-500 text-4xl cursor-pointer hover:text-stone-700"
        >
          &times;
        </button>
        {/* Transaction Details */}
        <h3 className="text-xl font-semibold mb-4">Transaction Details</h3>
        <div className="space-y-2">
          <p>
            <strong>Sender Name:</strong> {transaction.userPdf.userName}
          </p>
          <p>
            <strong>Email:</strong> {transaction.userPdf.userEmail}
          </p>
          <p>
            <strong>Phone Number:</strong> {transaction.userPdf.userPhnNo}
          </p>
          <p>
            <strong>Total Pages:</strong> {transaction.userPdf.pdfDetails.totalPages}
          </p>
          <p>
            <strong>Total Files:</strong>{" "}
            {transaction.userPdf.pdfDetails.totalFilesBlackAndWhite +
              transaction.userPdf.pdfDetails.totalFilesColored}
          </p>
          <p>
            <strong>Payment Amount:</strong> ₹{transaction.shopAmount}
          </p>
          <p>
            <strong>Status:</strong> {transaction.status}
          </p>
          <p>
            <strong>Mode:</strong> {transaction.mode} {/* Display Mode */}
          </p>
          <p>
            <strong>Time:</strong>{" "}
            {new Date(transaction.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};