"use client";

import React, { useEffect, useState } from "react";
import { Close } from "@/public/icons/close";
import { toast } from "react-toastify";
// import { AddInventory, EditInventory } from "../components/functions/InventoryFunctions";

export function AddInventoryModal({
  isOpen,
  onClose,
  newInventory,
  handleInputChange,
  refreshInventory,
  isEditing = false,
}) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 10);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => onClose(), 300);
  };

  const handleSubmit = async () => {
    const payload = { ...newInventory };

    try {
      const submitAction = isEditing ? EditInventory : AddInventory;
      const success = await submitAction(payload);

      if (success) {
        toast.success(`Inventory ${isEditing ? "updated" : "added"}!`);
        handleClose();
        if (typeof refreshInventory === "function") refreshInventory();
      } else {
        toast.error("Failed to save inventory.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed inset-0 z-[101] bg-black/50"
      ></div>

      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[102] transform transition-transform duration-300 ease-in-out shadow-xl ${
          showModal ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">
            {isEditing ? "Edit Inventory" : "Add New Inventory"}
          </h2>
          <div
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <Close className="size-6 stroke-3" />
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={newInventory.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Unit</label>
            <input
              type="text"
              value={newInventory.unit}
              onChange={(e) => handleInputChange("unit", e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Stock</label>
            <input
              type="number"
              value={newInventory.stock}
              onChange={(e) => handleInputChange("stock", e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Acquisition Price</label>
            <input
              type="number"
              value={newInventory.acquisition}
              onChange={(e) => handleInputChange("acquisition", e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Retail Price</label>
            <input
              type="number"
              value={newInventory.retail}
              onChange={(e) => handleInputChange("retail", e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
