import React, { useState, useEffect } from "react";
import { MergePDFButton } from "./MergePDFButton";

export const PrintCard = ({ data, type, pagesInMachine, setPagesInMachine }) => {
  // State to manage loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(true);
  function handleUnpaidFocus() {
    setIsFocused(false);
  }

  function handlePaidFocus() {
    setIsFocused(true);
  }

  // Helper function to filter PDFs based on conditions
  const getPdfsByCondition = (isPaid, isPrinted) => {
    return data?.pdfs?.filter((pdf) => {
      if (
        pdf.isPaid === isPaid &&
        (!isPrinted || pdf.isPrinted === isPrinted) &&
        pdf.pdfDetails[type.type]?.trim() !== ""
      ) {
        return pdf.pdfDetails[type.type];
      }
    });
  };

  // Get today's date in "MMM D" format (e.g., "Feb 24")
  const todayDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Filter PDFs for paid and unpaid categories
  const paidPdfs = getPdfsByCondition(true, false); // Paid and not printed
  const unpaidPdfs = getPdfsByCondition(false, false); // Unpaid and not printed

  // Simulate data loading (optional, if data is fetched asynchronously)
  useEffect(() => {
    if (!data) {
      setIsLoading(true);
      setError("Data is not available.");
    } else {
      setIsLoading(false);
      setError(null);
    }
  }, [data]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-stone-500">Loading...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="text-center text-xl font-bold mb-4 col-span-12">
        {type.title}
      </header>

      {/* Container for Paid PDFs */}
      <div
        onClick={handlePaidFocus}
        className={`${
          isFocused ? "col-span-11" : "col-span-1 border-4"
        } p-4 rounded border-[1px] border-stone-300 mb-6 overflow-hidden`}>
        {isFocused ? (
          <Container
          setPagesInMachine={setPagesInMachine} pagesInMachine={pagesInMachine}
            type={type}
            pdfs={paidPdfs}
            title="Paid PDFs"
            trendColor="#33FF57"
            period={todayDate}
            data={data}>
            <div className="flex flex-nowrap gap-5 overflow-auto">
              {paidPdfs.length > 0 ? (
                paidPdfs.map((pdf) => (
                  <div key={pdf._id} className="mb-4 shrink-0">
                    <h4 className="font-semibold">{pdf.userName}</h4>
                    <p className="text-sm text-stone-500">
                      Pages: {pdf.pdfDetails[type.pages]}
                    </p>
                    <iframe
                      src={pdf.pdfDetails[type.type]}
                      width="100%"
                      height="300px"
                      title={`PDF by ${pdf.userName}`}
                      className="border rounded mt-2"></iframe>
                  </div>
                ))
              ) : (
                <p>No paid PDFs to display.</p>
              )}
            </div>
          </Container>
        ) : (
          <h1 className="-rotate-90 mt-10 text-2xl font-extralight ">
            Paid(<span className="text-purple-600">{paidPdfs.length}</span>)
          </h1>
        )}
      </div>
      <div
        onClick={handleUnpaidFocus}
        className={`${
          isFocused ? "col-span-1 border-4" : "col-span-11"
        } p-4 rounded border-[1px] min-h-30 border-stone-300 mb-6 overflow-hidden`}>
        {/* Container for Unpaid PDFs */}
        {isFocused ? (
          <h1 className="rotate-90 text-2xl font-extralight ">
            Unpaid(<span className="text-purple-600">{unpaidPdfs.length}</span>)
          </h1>
        ) : (
          <Container
          setPagesInMachine={setPagesInMachine} pagesInMachine={pagesInMachine}
            data={data}
            pdfs={unpaidPdfs}
            type={type}
            title="Unpaid PDFs"
            trendColor="#FF5733"
            period={todayDate}>
            <div className="flex flex-nowrap gap-5 overflow-auto">
              {unpaidPdfs.length > 0 ? (
                unpaidPdfs.map((pdf) => (
                  <div key={pdf._id} className="mb-4 shrink-0">
                    <h4 className="font-semibold">{pdf.userName}</h4>
                    <p className="text-sm text-stone-500">
                      Pages: {pdf.pdfDetails.totalPagesBlackAndWhite}
                    </p>
                    <iframe
                      src={pdf.pdfDetails.blackAndWhiteSingleSided}
                      width="100%"
                      height="300px"
                      title={`PDF by ${pdf.userName}`}
                      className="border rounded mt-2"></iframe>
                  </div>
                ))
              ) : (
                <p>No unpaid PDFs to display.</p>
              )}
            </div>
          </Container>
        )}
      </div>
    </>
  );
};

// Container Component
const Container = ({ title, children, data, type, pdfs, pagesInMachine, setPagesInMachine }) => {
  return (
    <>
      <div className="flex mb-4 items-start justify-between">
        <h3 className="text-lg font-medium text-stone-700 flex justify-between w-full">
          {title} {pagesInMachine < 20 ? <p className="text-red-600 text-sm">Insert Pages</p> : <MergePDFButton  pdfs={pdfs} data={data} type={type} setPagesInMachine={setPagesInMachine} pagesInMachine={pagesInMachine} />}
        </h3>
      </div>
      <div>{children}</div>
    </>
  );
};
