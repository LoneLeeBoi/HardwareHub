"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "@/public/icons/plus";
import { Edit } from "@/public/icons/edit";
import { Trash } from "@/public/icons/trash";
import { AddInventoryModal } from "@/app/popups/addInventoryModal";
import { ConfirmationModal } from "@/app/popups/confirmationModal";
import useInventoryHandlers from "./inventoryHandler";
import Pagination from "@/app/utils/Pagination";

const Page = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [inventory, setInventory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingId, setEditingId] = useState(false);
  const { isConfirm, setConfirm, handleDeleteInventory } =
    useInventoryHandlers();

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

  const handleInputChange = (field, value) => {
    setNewInventory((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddInventory = () => {
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

      <div className="border border-gray-200 rounded p-4">
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
        </div>

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
                  if (a.stock !== b.stock) return a.stock - b.stock;
                  return new Date(b.created_at) - new Date(a.created_at);
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

        <Pagination
          currentPage={page}
          setCurrentPage={setPage}
          totalPages={totalPages}
        />
      </div>

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
          if (isConfirm) setConfirm("");
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
