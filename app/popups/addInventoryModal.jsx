"use client";

import React, { useEffect, useState } from "react";
import { Close } from "@/public/icons/close";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";
import {
  AddInventory,
  EditInventory,
} from "../components/functions/InventoryFunctions";

export function AddInventoryModal({
  isOpen,
  onClose,
  newInventory,
  handleInputChange,
  fetchInventory,
  isEditing = false,
}) {
  const [showModal, setShowModal] = useState(false);
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetch("/api/product")
        .then((res) => res.json())
        .then((data) => setProductOptions(data?.data))
        .catch((err) => console.error("Failed to fetch product names:", err));
    }
  }, [isOpen]);

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
    const token = localStorage.getItem("token");
    const decoded = jwt.decode(token);
    const id = decoded?.id || decoded?.sub;
    const payload = {
      ...newInventory,
      user_id: id,
    };
    try {
      const submitAction = isEditing ? EditInventory : AddInventory;
      const success = await submitAction(payload);

      if (success) {
        toast.success(`Inventory ${isEditing ? "updated" : "added"}!`);
        handleClose();
        if (typeof fetchInventory === "function") fetchInventory();
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
            <label className="block text-sm font-medium">Product Name</label>
            <select
              value={newInventory.product_id}
              onChange={(e) => handleInputChange("product_id", e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a product</option>
              {productOptions?.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
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
            <label className="block text-sm font-medium">
              Acquisition Price
            </label>
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