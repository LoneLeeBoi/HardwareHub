"use client";

import React, { useEffect, useState } from "react";
import { Close } from "@/public/icons/close"; // Make sure this exists or replace with text/icon
import jwt from "jsonwebtoken";
import {
  AddExpense,
  EditExpense,
} from "../components/functions/ExpenseFunctions";
import { toast } from "react-toastify";
export function AddExpenseModal({
  isOpen,
  onClose,
  newExpense,
  handleInputChange,
  refreshExpense,
  isEditing = false,
}) {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 10);
      fetch("/api/product/categories")
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.error("Failed to load categories", err));
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  const [userId, setUserId] = useState();
  useEffect(() => {
    if (isOpen) {
      // Start animation after render
      setTimeout(() => setShowModal(true), 10);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => onClose(), 300); // match transition duration
  };

  const handleAddExpense = async () => {
    const token = localStorage.getItem("token");
    const decoded = jwt.decode(token);
    const id = decoded?.id || decoded?.sub;

    const payload = {
      ...newExpense,
      user_id: id,
    };
    try {
      const submitAction = isEditing ? EditExpense : AddExpense;

      const success = await submitAction(payload);
      if (success) {
        toast.success("Expense added successfully!");
        handleClose();
        if (typeof refreshExpense === "function") refreshExpense();
      } else {
        toast.error("Failed to add expense. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }
  };
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 z-[101] bg-black/50"
      ></div>

      {/* Animated Modal */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[102] transform transition-transform duration-300 ease-in-out shadow-xl  ${
          showModal ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">
            {isEditing ? "Edit Expense" : "Add New Expense"}
          </h2>
          <div
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <Close className={`size-6 stroke-3`} />
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            {/* Hidden or read-only field for User ID */}

            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={newExpense.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              value={newExpense.category_id}
              onChange={(e) => handleInputChange("category_id", e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleAddExpense}
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
