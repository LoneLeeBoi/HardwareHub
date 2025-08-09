"use client";

import React, { useEffect, useState } from "react";
import { Close } from "@/public/icons/close";
import { toast } from "react-toastify";
import { EditUser } from "../components/functions/UsersFunctions";

export default function AddUserModal({
  isOpen,
  onClose,
  newUser,
  setNewUser,
  refreshUsers,
  isEditing = false,
}) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleInputChange = (field, value) => {
    setNewUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await EditUser(newUser);
      if (res) {
        toast.success("Edit Successfully");
        refreshUsers?.();
        handleClose();
      }
    } catch (error) {
      console.error("Error editing user:", error);
      toast.error("Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed inset-0 z-[101] bg-black/50"
      />

      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[102] transform transition-transform duration-300 ease-in-out shadow-xl ${
          showModal ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">
            {isEditing ? "Edit User" : "Add New User"}
          </h2>
          <div
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
          >
            <Close className="size-6 stroke-3" />
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          <InputField
            label="First Name"
            type="text"
            value={newUser.firstname || ""}
            onChange={(val) => handleInputChange("firstname", val)}
          />
          <InputField
            label="Last Name"
            type="text"
            value={newUser.lastname || ""}
            onChange={(val) => handleInputChange("lastname", val)}
          />
          <InputField
            label="Address"
            type="text"
            value={newUser.address || ""}
            onChange={(val) => handleInputChange("address", val)}
          />
          <InputField
            label="Contact"
            type="text"
            value={newUser.contact || ""}
            onChange={(val) => handleInputChange("contact", val)}
          />

          {/* Submit Button */}
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}
