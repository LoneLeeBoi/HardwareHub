"use client";

import React, { useState } from "react";
import { Chart } from "./components/blocks/Chart";

export default function Page() {
  const salesReport = [
    { label: "daily sales", amount: 222880.5 },
    { label: "monthly sales", amount: 222880.5 },
    { label: "yearly sales", amount: 222880.5 },
    { label: "gross sales", amount: 222880.5 },
    { label: "products sold", amount: 222880.5 },
    { label: "best seller", amount: "Nails" }, // ✅ non-numeric
  ];

  const [selectedReport, setSelectedReport] = useState("monthly sales");

  return (
    <div className="container p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">SALES REPORT</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {salesReport.map((report, index) => (
          <div
            key={index}
            onClick={() => {
              if (report.label !== "best seller") {
                setSelectedReport(report.label);
              }
            }}
            className={`p-4 rounded-xl shadow-md transition duration-200 ${
              report.label === "best seller"
                ? "bg-gray-100 cursor-not-allowed opacity-70"
                : selectedReport === report.label
                ? "bg-blue-100 ring-2 ring-blue-500"
                : "bg-white hover:shadow-lg cursor-pointer"
            }`}
          >
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {report.label}
            </h3>
            <p className="text-lg font-semibold text-gray-800 mt-2">
              {typeof report.amount === "number"
                ? `₱ ${report.amount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}`
                : report.amount}
            </p>
          </div>
        ))}
      </div>

      <Chart reportType={selectedReport} />
    </div>
  );
}
