"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Chart({ reportType }) {
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState([]);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Simulate different data for each report type
  const getMockData = (type) => {
    switch (type) {
      case "daily sales":
        return Array(12).fill().map(() => Math.floor(Math.random() * 100 + 20));
      case "monthly sales":
        return [1000, 1200, 950, 1300, 1100, 1600, 1700, 1400, 1250, 1800, 1900, 2100];
      case "yearly sales":
        return Array(12).fill().map(() => Math.floor(Math.random() * 10000));
      case "gross sales":
        return Array(12).fill().map(() => Math.floor(Math.random() * 5000 + 1000));
      case "products sold":
        return Array(12).fill().map(() => Math.floor(Math.random() * 200 + 50));
      case "best seller":
        return Array(12).fill().map(() => Math.floor(Math.random() * 50 + 10));
      default:
        return Array(12).fill(0);
    }
  };

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      const data = getMockData(reportType);
      setSalesData(data);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [reportType]); // ✅ Always a string

  const placeholderData = months.map(() =>
    Math.floor(Math.random() * 1200 + 200)
  );

  const chartData = {
    labels: months,
    datasets: [
      {
        label: reportType.toUpperCase(),
        data: loading ? placeholderData : salesData,
        backgroundColor: loading
          ? "rgba(209, 213, 219, 0.7)"
          : "rgba(54, 162, 235, 0.6)",
        borderColor: loading
          ? "rgba(209, 213, 219, 1)"
          : "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: loading ? 1000 : 500,
      easing: loading ? "easeInOutBounce" : "easeOutQuart",
    },
    plugins: {
      legend: {
        display: !loading,
        position: "top",
      },
      title: {
        display: true,
        text: `${reportType.toUpperCase()} Performance`,
      },
      tooltip: {
        enabled: !loading,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <Bar data={chartData} options={options} />
    </div>
  );
}
