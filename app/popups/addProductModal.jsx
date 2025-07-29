"use client";

import React, { useEffect, useState } from "react";
import { Close } from "@/public/icons/close";
import { AddProduct, EditProduct } from "../components/functions/ProductFunctions";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";

export function AddProductModal({
  isOpen,
  onClose,
  newProduct,
  handleInputChange,
  refreshProducts,
  isEditing = false,
  categories = [],
}) {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 10);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwt.decode(token);
      const id = decoded?.id || decoded?.sub;
      if (id) {
        setUserId(id);
        handleInputChange("user_id", id); // Auto-fill user ID
      }
    } catch (error) {
      console.error("Token decode error:", error);
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => onClose(), 300);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const submitAction = isEditing ? EditProduct : AddProduct;
      const success = await submitAction(newProduct);

      if (success) {
        toast.success(isEditing ? "Product updated successfully!" : "Product added successfully!");
        handleClose();
        if (typeof refreshProducts === "function") refreshProducts();
      } else {
        toast.error(isEditing ? "Failed to update product." : "Failed to add product.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div onClick={handleClose} className="fixed inset-0 z-[101] bg-black/50" />

      {/* Slide-in Modal */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[102] transform transition-transform duration-300 ease-in-out shadow-xl ${
          showModal ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>
          <div
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <Close className="size-6 stroke-3" />
          </div>
        </div>

        <div className="p-4 space-y-4">
          <InputField
            label="Product Name"
            type="text"
            value={newProduct.name}
            onChange={(val) => handleInputChange("name", val)}
          />

          <InputField
            label="Image"
            type="file"
            value={newProduct.image}
            onChange={(val) => handleInputChange("image", val)}
          />

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={newProduct.category_id || ""}
              onChange={(e) => handleInputChange("category_id", e.target.value)}
              className="w-full border rounded px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <InputField
            label="Price"
            type="text"
            value={newProduct.price}
            onChange={(val) => handleInputChange("price", val)}
          />

          <InputField
            label="Stock Quantity"
            type="number"
            value={newProduct.stock}
            onChange={(val) => handleInputChange("stock", val)}
          />

          {/* Hidden user_id */}
          <div className="hidden">
            <label className="block text-sm font-medium mb-1">User ID</label>
            <input
              type="text"
              value={newProduct.user_id}
              readOnly
              className="w-full border rounded px-3 py-2 text-sm bg-gray-100"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : isEditing ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function InputField({ label, type, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={type === "file" ? undefined : value}
        onChange={(e) =>
          type === "file"
            ? onChange(e.target.files[0])
            : onChange(e.target.value)
        }
        className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={type !== "file" ? `Enter ${label.toLowerCase()}` : undefined}
      />
    </div>
  );
}
