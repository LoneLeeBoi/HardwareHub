"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "@/public/icons/plus";
import { AddInventoryModal } from "@/app/popups/addInventoryModal";
import { Edit } from "@/public/icons/edit";
import { ConfirmationModal } from "@/app/popups/confirmationModal";
import useInventoryHandlers from "./inventoryHandler";
import { Trash } from "@/public/icons/trash";
const Page = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [inventory, setInventory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingId, setEditingId] = useState(false);
  const { isConfirm, setConfirm, handleDeleteInventory } = useInventoryHandlers();
  const [newInventory, setNewInventory] = useState({
    product_id: "",
    stock: "",
    acquisition: "",
    retail: "",
    user_id: "",
  });
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

  useEffect(() => {
    fetchInventory();
  
  }, [search, page, limit, isConfirm]);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  const getDesktopPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };
  const handleInputChange = (field, value) => {
    setNewInventory((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddInventory = () => {
    // No POST logic — just close modal
    setModalOpen(false);
  };
  const handleEdit = (item) => {
    setNewInventory(item);
    setEditingId(item.id);
    setIsEditing(true);
    setModalOpen(true);
  };

  return (
    <div className="p-4">
      {/* Add Inventory Button */}
      <div
        onClick={() => {
          setIsEditing(false);
          setNewInventory({
            product_id: "",
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
            placeholder="Search name..."
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

        {/* Inventory Table */}
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Unit</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Acquisition</th>
              <th className="p-2">Retail</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length > 0 ? (
              inventory
                .slice()
                .sort((a, b) => {
                  if (a.stock !== b.stock) {
                    return a.stock - b.stock; // Lowest stock first
                  }
                  return new Date(b.created_at) - new Date(a.created_at); // Newest first
                })
                .map((item) => (
                  <tr key={item.id}>
                    <td className="p-2">{item.product_name}</td>
                    <td className="p-2">{item.units}</td>
                    <td className="p-2">{item.stock}</td>
                    <td className="p-2">{item.acquisition}</td>
                    <td className="p-2">{item.retail}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <div
                        onClick={() => {
                          handleEdit(item);
                          setIsEditing(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <Edit className="size-6" />
                      </div>
                      <div
                        onClick={() => setConfirm(item.id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash className="size-6" />
                      </div>
                    </td>
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
        <div className="flex flex-col items-center gap-2 mt-4 text-sm sm:flex-row justify-center">
          {/* Previous div */}
          <div
            onClick={handlePrev}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </div>

          {/* Page Numbers */}
          <div className="flex gap-1 flex-wrap justify-center">
            {getDesktopPages().map((p, idx) => (
              <div
                key={idx}
                onClick={() => typeof p === "number" && setPage(p)}
                disabled={p === "..."}
                className={`px-2 py-1 border rounded ${
                  p === page ? "bg-black text-white" : ""
                }`}
              >
                {p}
              </div>
            ))}
          </div>

          {/* Next div */}
          <div
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </div>
        </div>
      </div>

      {/* Modal */}
      <AddInventoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        newInventory={newInventory}
        handleInputChange={handleInputChange}
        handleAddInventory={handleAddInventory}
        fetchInventory={fetchInventory}
        isEditing={isEditing}
      />

      <ConfirmationModal
        isOpen={isConfirm}
        onClose={() => {
          if (isConfirm) {
            setConfirm("");
          }
        }}
        onConfirm={() => {
          if (isConfirm) {
            handleDeleteInventory(isConfirm);
            setConfirm("");
          }
        }}
        title="Are you sure?"
        message="This action cannot be undone."
      />
    </div>
  );
};

export default Page;
