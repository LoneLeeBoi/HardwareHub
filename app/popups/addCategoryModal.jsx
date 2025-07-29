"use client";

import React, { useEffect, useState } from "react";
import { Close } from "@/public/icons/close";
import { toast } from "react-toastify";
import {
  AddCategory,
  EditCategory,
} from "../components/functions/CategoryFunctions";

export function AddCategoryModal({
  isOpen,
  onClose,
  newCategory,
  handleInputChange,
  refreshCategories,
  isEditingCategory = false,
  editCategoryId = null,
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
    setTimeout(() => onClose(), 300); // match transition duration
  };

  const handleSubmit = async () => {
    if (!newCategory.name.trim()) {
      toast.error("Category name is required.");
      return;
    }

    let result;

    if (isEditingCategory && editCategoryId) {
      result = await EditCategory({
        id: editCategoryId,
        name: newCategory.name,
      });
    } else {
      result = await AddCategory({ name: newCategory.name });
    }

    if (result.success) {
      toast.success(isEditingCategory ? "Category updated!" : "Category added!");
      refreshCategories();
      handleClose();
    } else {
      toast.error(result.err || "Something went wrong.");
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

      {/* Modal Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[102] transform transition-transform duration-300 ease-in-out shadow-xl ${
          showModal ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">
            {isEditingCategory ? "Edit Category" : "Add New Category"}
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
            <label className="block text-sm font-medium">Category Name</label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="mt-1 w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isEditingCategory ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
