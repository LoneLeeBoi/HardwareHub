"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "@/public/icons/plus";
import { AddInventoryModal } from "@/app/popups/addInventoryModal";
const Page = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [inventory, setInventory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [newInventory, setNewInventory] = useState({
    name: "",
    unit: "",
    stock: "",
    acquisition: "",
    retail: "",
  });

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append("search", search);

        queryParams.append("page", page.toString());
        queryParams.append("limit", limit.toString());

        const res = await fetch(
          `http://localhost:3000/api/inventory?${queryParams}`
        );
        const json = await res.json();

        setInventory(json.data || []);
        setTotalPages(json.totalPages || 1);
      } catch (error) {
        console.error("Error fetching inventory:", error);
        setInventory([]);
        setTotalPages(1);
      }
    };

    fetchInventory();
  }, [search, page, limit]);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  const handleInputChange = (field, value) => {
    setNewInventory((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddInventory = () => {
    // No POST logic — just close modal
    setModalOpen(false);
  };

  return (
    <div className="p-4">
      {/* Add Inventory Button */}
      <div
        onClick={() => {
          setIsEditing(false);
          setNewInventory({
            name: "",
            unit: "",
            stock: "",
            acquisition: "",
            retail: "",
          });
          setModalOpen(true);
        }}
        className="my-4 flex w-fit items-center uppercase gap-3 px-6 py-3 bg-gray-100 hover:bg-blue-700 text-gray-700 hover:text-white rounded-lg font-xs font-black transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
      >
        <Plus className="size-5 stroke-3" />
        inventory
      </div>

      {/* Inventory Table + Filters */}
      <div className="border border-gray-200 rounded p-4">
        {/* Filters */}
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
              <th className="p-2">Unit</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Acquisition</th>
              <th className="p-2">Retail</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length > 0 ? (
              inventory.map((item) => (
                <tr key={item.id}>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.unit}</td>
                  <td className="p-2">{item.stock}</td>
                  <td className="p-2">{item.acquisition}</td>
                  <td className="p-2">{item.retail}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-2">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 text-sm space-x-2">
          <span
            onClick={page === 1 ? undefined : handlePrev}
            className={`px-3 py-1 border rounded w-[50px] text-center cursor-pointer ${
              page === 1 ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
            }`}
          >
            Prev
          </span>

          <div>
            Page {page} of {totalPages}
          </div>

          <span
            onClick={page === totalPages ? undefined : handleNext}
            className={`px-3 py-1 border rounded w-[50px] text-center cursor-pointer ${
              page === totalPages
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : ""
            }`}
          >
            Next
          </span>
        </div>
      </div>

      {/* Modal */}
      <AddInventoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        newInventory={newInventory}
        handleInputChange={handleInputChange}
        handleAddInventory={handleAddInventory}
        isEditing={isEditing}
      />
    </div>
  );
};

export default Page;
