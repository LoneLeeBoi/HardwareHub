"use client";
import React, { useState } from "react";

export default function Page() {
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");

  const data = [
    {
      id: 1,
      name: "John Doe",
      total: 5000,
      paid: 2000,
      balance: 3000,
      dueDate: "2025-08-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      total: 10000,
      paid: 10000,
      balance: 0,
      dueDate: "2025-08-01",
    },
    {
      id: 3,
      name: "Mark Johnson",
      total: 7000,
      paid: 3000,
      balance: 4000,
      dueDate: "2025-08-01",
    },
  ];

  const getStatus = (item) => {
    if (item.balance <= 0) return "Paid";

    const due = new Date(item.dueDate);
    const today = new Date();
    const diffDays = (due - today) / (1000 * 60 * 60 * 24);

    if (due < today) return "Overdue";
    if (diffDays <= 7) return "Almost Due";
    return "Pending";
  };

  const filteredData = data
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => {
      const status = getStatus(item);
      if (statusFilter === "All") return true;
      return status === statusFilter;
    });

  const sortedData = filteredData.slice().sort((a, b) => {
    const today = new Date();
    const aDue = new Date(a.dueDate);
    const bDue = new Date(b.dueDate);

    const aIsOverdue = aDue < today && a.balance > 0;
    const bIsOverdue = bDue < today && b.balance > 0;

    const aIsAlmostDue =
      !aIsOverdue && a.balance > 0 && (aDue - today) / (1000 * 60 * 60 * 24) <= 7;
    const bIsAlmostDue =
      !bIsOverdue && b.balance > 0 && (bDue - today) / (1000 * 60 * 60 * 24) <= 7;

    // 1. Overdue debts come first
    if (aIsOverdue && !bIsOverdue) return -1;
    if (!aIsOverdue && bIsOverdue) return 1;

    // 2. Then almost due debts
    if (aIsAlmostDue && !bIsAlmostDue) return -1;
    if (!aIsAlmostDue && bIsAlmostDue) return 1;

    // 3. Then the rest by due date (earliest first)
    return aDue - bDue;
  });

  const paginatedData = sortedData.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filteredData.length / limit);

  const getDesktopPages = () => {
    return [...Array(totalPages).keys()].map((n) => n + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="p-4">
      <div className="border border-gray-200 rounded p-4">
        {/* Filter Inputs */}
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
                    <td className="p-2">₱{item.total}</td>
                    <td className="p-2">₱{item.paid}</td>
                    <td className="p-2">₱{item.balance}</td>
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
                      <button className="text-blue-600 hover:underline text-xs">
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-2">
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
