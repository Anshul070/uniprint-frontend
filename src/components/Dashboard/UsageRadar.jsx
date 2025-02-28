import React from "react";
import { FiEye } from "react-icons/fi";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Function to process payments (both online and offline) and calculate totals for each feature
function getRadarData(data) {
  const features = [
    "blackAndWhiteSingleSided",
    "blackAndWhiteDoubleSided",
    "coloredSingleSided",
    "coloredDoubleSided",
  ];

  // Initialize totals for each feature
  const totals = features.reduce((acc, feature) => {
    acc[feature] = 0;
    return acc;
  }, {});

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

  // Sum up the values for each feature across all payments
  allPayments.forEach((payment) => {
    const pdfDetails = payment.userPdf?.pdfDetails;
    if (pdfDetails) {
      features.forEach((feature) => {
        totals[feature] += pdfDetails[feature]?.trim() !== "" ? 1 : 0; // Count only non-empty URLs
      });
    }
  });

  const labels = ["B/W Single", "B/W Double", "Col Single", "Col Double"];

  // Transform totals into the format required by Recharts
  return features.map((feature, index) => ({
    feature: labels[index], // Format feature names (e.g., "blackAndWhiteSingleSided" -> "B/W Single")
    files: totals[feature],
  }));
}

export const UsageRadar = ({ data }) => {
  // Process data for the radar chart
  const radarData = getRadarData(data);

  // Check if there is no data available
  const isEmpty = radarData.every((item) => item.files === 0);

  return (
    <div className="col-span-4 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiEye /> Usage
        </h3>
      </div>
      <div className="h-64 px-4">
        {isEmpty ? (
          // Display a message if there are no payments
          <div className="flex justify-center items-center h-full text-stone-500">
            No data available
          </div>
        ) : (
          // Render the radar chart if there are payments
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis className="text-xs font-bold" dataKey="feature" />
              <PolarRadiusAxis angle={30} domain={[0, Math.max(...radarData.map((d) => d.files))]} />
              <Radar
                name="Files"
                dataKey="files"
                stroke="#18181b"
                fill="#18181b"
                fillOpacity={0.2}
              />
              <Tooltip
                wrapperClassName="text-sm rounded"
                labelClassName="text-xs text-stone-500"
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};