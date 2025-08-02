"use client";

import React, { useState, useEffect } from "react";

// Sample data
const sampleData = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    total: 5000,
    paid: 5000,
    balance: 0,
    dueDate: "2025-07-01",
    paymentMethod: "Cash",
  },
  {
    id: 2,
    name: "Maria Santos",
    total: 8000,
    paid: 3000,
    balance: 5000,
    dueDate: "2025-08-01",
    paymentMethod: "Gcash",
  },
  {
    id: 3,
    name: "Pedro Reyes",
    total: 6000,
    paid: 2000,
    balance: 4000,
    dueDate: "2025-08-10",
    paymentMethod: "Bank Transfer",
  },
];

export default function Page() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  // Calculate status dynamically
  const getStatus = (item) => {
    if (item.paid >= item.total) return "Paid";

    const today = new Date();
    const due = new Date(item.dueDate);
    const diff = (due - today) / (1000 * 60 * 60 * 24);

    if (diff < 0) return "Overdue";
    if (diff <= 3) return "Almost Due";
    return "Pending";
  };

  // Filtered and searched data
  const filteredData = sampleData.filter((item) => {
    const status = getStatus(item);
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / limit);
  const paginatedData = filteredData.slice((page - 1) * limit, page * limit);

  const handlePrev = () => page > 1 && setPage((p) => p - 1);
  const handleNext = () => page < totalPages && setPage((p) => p + 1);

  const getDesktopPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="p-4">
      <div className="border border-gray-200 rounded p-4">
        {/* Filters */}
        <div className="flex sm:flex-row sm:items-center gap-2 mb-4 ">
          <input
            type="text"
            placeholder="Search..."
            className="p-1 text-sm border rounded w-full sm:w-[200px]"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <select
            className="p-1 text-sm border rounded w-full sm:w-[120px] h-[45px]"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
          >
            {["All", "Paid", "Overdue", "Almost Due", "Pending"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            className="p-1 text-sm border rounded w-full sm:w-[100px]"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            {[5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Payment Method</th>
              <th className="p-2">Total</th>
              <th className="p-2">Paid</th>
              <th className="p-2">Balance</th>
              <th className="p-2">Due Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => {
                const status = getStatus(item);
                return (
                  <tr key={item.id}>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.paymentMethod}</td>
                    <td className="p-2">₱{item.total}</td>
                    <td className="p-2">₱{item.paid}</td>
                    <td className="p-2">₱{item.total - item.paid}</td>
                    <td className="p-2">{item.dueDate}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          status === "Paid"
                            ? "bg-green-100 text-green-600"
                            : status === "Overdue"
                            ? "bg-red-100 text-red-600"
                            : status === "Almost Due"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button className="text-blue-600 hover:underline text-xs">View</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-2">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col items-center gap-2 mt-4 text-sm sm:flex-row justify-center">
          <div
            onClick={handlePrev}
            className={`px-3 py-1 border rounded cursor-pointer ${
              page === 1 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Prev
          </div>
          <div className="flex gap-1 flex-wrap justify-center">
            {getDesktopPages().map((p, idx) => (
              <div
                key={idx}
                onClick={() => setPage(p)}
                className={`px-2 py-1 border rounded cursor-pointer ${
                  p === page ? "bg-black text-white" : ""
                }`}
              >
                {p}
              </div>
            ))}
          </div>
          <div
            onClick={handleNext}
            className={`px-3 py-1 border rounded cursor-pointer ${
              page === totalPages ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            Next
          </div>
        </div>
      </div>
    </div>
  );
}
