"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "@/public/icons/plus";

import { AddInventoryModal } from "@/app/popups/addInventoryModal";
import { ConfirmationModal } from "@/app/popups/confirmationModal";
import useInventoryHandlers from "./inventoryHandler";
import Pagination from "@/app/utils/Pagination";
import Warning from "@/public/icons/warning";

const Page = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [inventory, setInventory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { isConfirm, setConfirm, handleDeleteInventory } =
    useInventoryHandlers();

  const [newInventory, setNewInventory] = useState({
    product_id: "",
    unit: "",
    stock: "",
    user_id: "",
  });
  const [defaultName, setDefaultName] = useState(null);
  const [defaultUnit, setDefaultUnit] = useState(null);

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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-900">INVENTORY TRACKER</h2>
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
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length > 0 ? (
              inventory.map((item) => {
                let status;

                if (item.stock <= 0) {
                  status = <span>Empty Stock</span>;
                } else if (item.stock > 10) {
                  status = (
                    <span className="flex items-center gap-1 justify-center w-[62px] h-[30px] bg-green-500 text-xs py-1 rounded-md border border-black text-white font-semibold">
                      Good
                    </span>
                  );
                } else if (item.stock <= 5) {
                  status = (
                    <span className="flex items-center gap-1 justify-center w-[62px] h-[30px] bg-red-300 text-xs py-1 animate-pulse rounded-md border border-red-500 text-red-500">
                      <Warning />
                      Low
                    </span>
                  );
                } else if (item.stock >= 5) {
                  status = (
                    <span className="bg-yellow-100 flex items-center gap-1 justify-center w-[62px] h-[30px] text-xs py-1 rounded-md border border-yellow-300 text-yellow-600">
                    Warning
                  </span>
                  
                  );
                }

                return (
                  <tr key={item.id}>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.units}</td>
                    <td className="p-2">{item.stock}</td>
                    <td className="p-2">{status}</td>

                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <div
                        onClick={() => {
                          setModalOpen(true);
                          setIsEditing(false);
                          setDefaultUnit(item.units);
                          setDefaultName(item.id)
                        }}
                        className="text-white shadow-lg bg-blue-500 p-2 rounded-md cursor-pointer"
                      >
                        <Plus className="size-5" />
                      </div>
                    </td>
                  </tr>
                );
              })
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
        setDefaultName={setDefaultName}
        defaultName={defaultName}
        setDefaultUnit={setDefaultUnit}
        defaultUnit={defaultUnit}
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