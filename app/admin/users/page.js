"use client";

import { Edit } from "@/public/icons/edit";
import { Trash } from "@/public/icons/trash";
import React, { useState } from "react";

// Sample user data
const sampleUsers = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    email: "juan@example.com",
    contact: "09171234567",
    address: "Cebu City, Philippines",
    role: "Admin",
    registeredAt: "2025-07-15",
    isActive: true,
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@example.com",
    contact: "09182345678",
    address: "Makati City, Philippines",
    role: "User",
    registeredAt: "2025-06-20",
    isActive: false,
  },
  {
    id: 3,
    name: "Pedro Reyes",
    email: "pedro.reyes@example.com",
    contact: "09201234567",
    address: "Davao City, Philippines",
    role: "Moderator",
    registeredAt: "2025-07-30",
    isActive: true,
  },
];

export default function Page() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const getStatus = (user) => (user.isActive ? "Active" : "Inactive");

  const filteredUsers = sampleUsers.filter((user) => {
    const status = getStatus(user);
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / limit);
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  const handlePrev = () => page > 1 && setPage((p) => p - 1);
  const handleNext = () => page < totalPages && setPage((p) => p + 1);

  const getDesktopPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  };

  const handleEdit = (id) => {
    alert(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      alert(`Deleted user with ID: ${id}`);
    }
  };

  return (
    <div className="p-4">
      <div className="border border-gray-200 rounded p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
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
            {["All", "Active", "Inactive"].map((status) => (
              <option key={status}>{status}</option>
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
              <th className="p-2">Email</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Address</th>
              <th className="p-2">Role</th>
              <th className="p-2">Registered At</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => {
                const status = getStatus(user);
                return (
                  <tr key={user.id}>
                    <td className="p-2  gap-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.contact}</td>
                    <td className="p-2">{user.address}</td>
                    <td className="p-2">{user.role}</td>
                    <td className="p-2">{user.registeredAt}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          status === "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="p-2 space-x-1 flex">
                      <div
                        onClick={() => handleEdit(user.id)}
                        className="text-blue-600 hover:underline text-xs"
                      >
                        <Edit className={`size-6`}/>
                      </div>
                      <div
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        <Trash className={`size-6`}/>
                      </div>
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
            {getDesktopPages().map((p) => (
              <div
                key={p}
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
