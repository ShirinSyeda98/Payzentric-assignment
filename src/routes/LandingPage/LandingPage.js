import React, { useState, useEffect } from "react";
import { apiInstance } from "../../config/apiInstance";
import "./LandingPage.css";

const LandingPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 15;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiInstance.post("/parse_pdf");

      if (
        response.data.code === "success" &&
        Array.isArray(response.data.pdf_cntnt)
      ) {
        const processedData = response.data.pdf_cntnt.map((row) =>
          row.slice(0, 5)
        );
        setData(processedData);
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching the data");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage * ROWS_PER_PAGE < data.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const totalPages = Math.ceil((data.length - 1) / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE + 1;
  const endIndex = Math.min(startIndex + ROWS_PER_PAGE, data.length);
  const currentData = data.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <span className="loading-text">Loading data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={fetchData} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="landing-page">
      <div className="content-container">
        <div className="table-header">
          <h1>API Data</h1>
          <div className="table-info">
            Showing entries {startIndex} to {endIndex - 1} of {data.length - 1}
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                {data[0]?.slice(0, 5).map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell || "N/A"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            ← Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
