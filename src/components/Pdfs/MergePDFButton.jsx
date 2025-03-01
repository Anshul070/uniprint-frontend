import React, { useContext, useEffect, useState } from "react";
import { shopData } from "../../context/shopContext";

export const MergePDFButton = ({ type, pdfs, pagesInMachine, setPagesInMachine }) => {
  const { handleManualRefetch } = useContext(shopData);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showDialog, setShowDialog] = useState(false);
  const [printingInitiated, setPrintingInitiated] = useState(false);
  const [printedPages, setPrintedPages] = useState(0);

  async function handleConfirmPrinted() {
    try {
      let ids = [];
      const awsUrls = pdfs.reduce((acc, pdf) => {
        const url = pdf.pdfDetails[type.type]?.trim();
        ids.push(pdf._id);
        if (url) acc.push(url);
        return acc;
      }, []); // Extract PDF IDs
      const response = await fetch(
        "http://localhost:5000/api/printing/delete",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deleteUrls: awsUrls,
            type: type.type,
            ids: ids,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to confirm printing.");
      }

      setShowDialog(false); // Close the dialog
      setPagesInMachine(pagesInMachine - printedPages);
      handleManualRefetch();
    } catch (error) {
      console.error("Error confirming printed status:", error);
      setError(error.message);
    }
  }

  async function handlePrintAll() {
    setIsLoading(true);
    setError(null);

    try {
      const awsUrls = pdfs.reduce((acc, pdf) => {
        const url = pdf.pdfDetails[type.type]?.trim();
        if (url) acc.push(url);
        return acc;
      }, []);

      const response = await fetch("http://localhost:5000/api/printing/merge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blackAndWhiteSingleSided: awsUrls }),
      });

      const pageCount = response.headers.get("Page-Count");
      console.log("Expected non-blank pages:", pageCount);

      const printWindow = window.open(); // Open an empty window immediately
      if (printWindow) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        printWindow.location.href = blobUrl; // Set the URL after the blob is ready
        printWindow.addEventListener("load", () => {
          printWindow.print();
        });
        if (pageCount) {
          setPrintedPages(pageCount);
        }
      } else {
        setError(
          "Failed to open the print window. Please check your browser's pop-up settings."
        );
      }

      // Mark that printing has been initiated so that we can show the dialog upon return.
      setPrintingInitiated(true);
    } catch (error) {
      console.error("Printing error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const onFocusHandler = () => {
      if (printingInitiated) {
        setShowDialog(true);
        setPrintingInitiated(false);
      }
    };
    window.addEventListener("focus", onFocusHandler);
    return () => {
      window.removeEventListener("focus", onFocusHandler);
    };
  }, [printingInitiated]);

  return (
    <div className="flex flex-col gap-2 w-fit">
      <button
        onClick={handlePrintAll}
        disabled={isLoading}
        className={`px-4 py-2 text-xs rounded ${
          isLoading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white transition-colors`}>
        {isLoading ? "Processing PDFs..." : "Merge All PDFs"}
      </button>

      {error && <div className="text-red-500 text-xs mt-2">Error: {error}</div>}

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto">
            <p className="text-xl mb-4">Did you print the PDFs?</p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  handleConfirmPrinted();
                }}
                className="px-4 py-1 bg-green-500 text-white rounded mr-2 hover:bg-green-600 transition text-sm">
                Yes
              </button>
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
