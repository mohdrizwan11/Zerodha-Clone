import React, { useState } from "react";

function Tables() {
  const [activeTab, setActiveTab] = useState("Equity");

  // Table data for different categories
  const tableData = {
    Equity: {
      columns: ["", "Equity delivery", "Equity intraday", "F&O - Futures", "F&O - Options"],
      rows: [
        {
          label: "Brokerage",
          values: [
            "Zero Brokerage",
            "0.03% or Rs. 20/executed order whichever is lower",
            "0.03% or Rs. 20/executed order whichever is lower",
            "Flat Rs. 20 per executed order"
          ]
        },
        {
          label: "STT/CTT",
          values: [
            "0.1% on buy & sell",
            "0.025% on the sell side",
            "0.02% on the sell side",
            "0.125% of the intrinsic value on options that are bought and exercised\n0.1% on sell side (on premium)"
          ]
        },
        {
          label: "Transaction charges",
          values: [
            "NSE: 0.00297%\nBSE: 0.00375%",
            "NSE: 0.00297%\nBSE: 0.00375%",
            "NSE: 0.00173%\nBSE: 0",
            "NSE: 0.03503% (on premium)\nBSE: 0.0325% (on premium)"
          ]
        },
        {
          label: "GST",
          values: [
            "18% on (brokerage + SEBI charges + transaction charges)",
            "18% on (brokerage + SEBI charges + transaction charges)",
            "18% on (brokerage + SEBI charges + transaction charges)",
            "18% on (brokerage + SEBI charges + transaction charges)"
          ]
        },
        {
          label: "SEBI charges",
          values: ["₹10 / crore", "₹10 / crore", "₹10 / crore", "₹10 / crore"]
        },
        {
          label: "Stamp charges",
          values: [
            "0.015% or ₹1500 / crore on buy side",
            "0.003% or ₹300 / crore on buy side",
            "0.002% or ₹200 / crore on buy side",
            "0.003% or ₹300 / crore on buy side"
          ]
        }
      ]
    },
    Currency: {
      columns: ["", "Currency futures", "Currency options"],
      rows: [
        {
          label: "Brokerage",
          values: [
            "0.03% or ₹ 20/executed order whichever is lower",
            "₹ 20/executed order"
          ]
        },
        {
          label: "STT/CTT",
          values: ["No STT", "No STT"]
        },
        {
          label: "Transaction charges",
          values: [
            "NSE: 0.00035%\nBSE: 0.00045%",
            "NSE: 0.0311%\nBSE: 0.001%"
          ]
        },
        {
          label: "GST",
          values: [
            "18% on (brokerage + SEBI charges + transaction charges)",
            "18% on (brokerage + SEBI charges + transaction charges)"
          ]
        },
        {
          label: "SEBI charges",
          values: ["₹10 / crore", "₹10 / crore"]
        },
        {
          label: "Stamp charges",
          values: [
            "0.0001% or ₹10 / crore on buy side",
            "0.0001% or ₹10 / crore on buy side"
          ]
        }
      ]
    },
    Commodity: {
      columns: ["", "Commodity futures", "Commodity options"],
      rows: [
        {
          label: "Brokerage",
          values: [
            "0.03% or Rs. 20/executed order whichever is lower",
            "₹ 20/executed order"
          ]
        },
        {
          label: "STT/CTT",
          values: ["0.01% on sell side (Non-Agri)", "0.05% on sell side"]
        },
        {
          label: "Transaction charges",
          values: [
            "MCX: 0.0021%\nNSE: 0.0001%",
            "MCX: 0.0418%\nNSE: 0.001%"
          ]
        },
        {
          label: "GST",
          values: [
            "18% on (brokerage + SEBI charges + transaction charges)",
            "18% on (brokerage + SEBI charges + transaction charges)"
          ]
        },
        {
          label: "SEBI charges",
          values: [
            "Agri:\n₹1 / crore\nNon-agri:\n₹10 / crore",
            "₹10 / crore"
          ]
        },
        {
          label: "Stamp charges",
          values: [
            "0.002% or ₹200 / crore on buy side",
            "0.003% or ₹300 / crore on buy side"
          ]
        }
      ]
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const renderTable = () => {
    const data = tableData[activeTab];
    
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr style={{ borderBottom: "2px solid #000" }}>
              {data.columns.map((column, index) => (
                <th key={index} className="text-start fw-bold" style={{ backgroundColor: "transparent", border: "none", padding: "12px 8px" }}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="fw-bold">{row.label}</td>
                {row.values.map((value, valueIndex) => (
                  <td key={valueIndex} className="text-muted" style={{ fontSize: "14px" }}>
                    {value.split('\n').map((line, lineIndex) => (
                      <div key={lineIndex}>{line}</div>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row p-5 mt-5">
      </div>
      
      <div className="row mt-3">
        <div className="col-12">
          {/* Tab Navigation */}
          <div className="mb-4">
            <ul className="nav nav-tabs" style={{ borderBottom: "1px solid #dee2e6" }}>
              {Object.keys(tableData).map((tabName) => (
                <li className="nav-item" key={tabName}>
                  <button
                    className={`nav-link ${activeTab === tabName ? "active" : ""}`}
                    onClick={() => handleTabClick(tabName)}
                    style={{
                      border: "none",
                      background: "none",
                      fontSize: "16px",
                      fontWeight: "500",
                      color: activeTab === tabName ? "#387ed1" : "#6c757d",
                      borderBottom: activeTab === tabName ? "2px solid #387ed1" : "2px solid transparent",
                      padding: "10px 20px"
                    }}
                  >
                    {tabName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Table Content */}
          <div className="mt-4">
            {renderTable()}
          </div>

          {/* Note */}
          <div className="mt-4 text-muted" style={{ fontSize: "14px" }}>
            <p>
              <strong>Note:</strong> All charges are subject to change as per exchange/regulatory requirements. 
              Please refer to our detailed pricing page for the most current information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tables;