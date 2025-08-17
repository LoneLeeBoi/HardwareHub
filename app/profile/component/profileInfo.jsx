"use client";

import React, { useEffect, useState } from "react";
import {
  AddDetails,
  EditUser,
  GetDetails,
} from "@/app/components/functions/UsersFunctions";
import { toast } from "react-toastify";

export default function ProfileInfo() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    contact: "",
    user_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!formData.firstname.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!formData.lastname.trim()) {
      toast.error("Last name is required");
      return false;
    }
    if (!formData.address.trim()) {
      toast.error("Address is required");
      return false;
    }
    if (!formData.contact.trim()) {
      toast.error("Contact is required");
      return false;
    }
    if (!/^\d{8,15}$/.test(formData.contact)) {
      toast.error("Contact must be a valid number (8-15 digits)");
      return false;
    }
    return true;
  };

  const handlerEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const success = await EditUser(formData);
      toast[success ? "success" : "error"](
        success ? "Profile updated successfully" : "Failed to update profile"
      );

      if (success) {
        localStorage.setItem("user_details", JSON.stringify(formData));
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Unexpected error while updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const success = await AddDetails(formData);
      toast[success ? "success" : "error"](
        success ? "Profile added successfully" : "Failed to add profile"
      );

      if (success) {
        localStorage.setItem("user_details", JSON.stringify(formData));
        setIsEditMode(true);
      }
    } catch (error) {
      console.error("Error adding profile:", error);
      toast.error("Unexpected error while adding profile");
    } finally {
      setLoading(false);
    }
  };

  const fetchDetails = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized. Please log in again.");
      return;
    }

    try {
      const res = await GetDetails(id);
      if (res) {
        localStorage.setItem("user_details", JSON.stringify(res));
        setFormData(res);
        setIsEditMode(true);
      } else {
        setIsEditMode(false);
        toast.warn("No profile found, please add one.");
      }
    } catch (error) {
      console.error("Error fetching details:", error);
      toast.error("Error fetching profile details");
    }
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user_details");
      const id = localStorage.getItem("id");

      if (storedUser) {
        setFormData(JSON.parse(storedUser));
        setIsEditMode(true);
      } else if (id) {
        fetchDetails(id);
      } else {
        setIsEditMode(false);
        toast.warn("No user found. Please add your profile.");
      }
    } catch (error) {
      console.error("Error loading stored user details:", error);
    }
  }, []);

  return (
    <div className="flex-1 max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
        {isEditMode ? "Edit Profile" : "Add Profile"}
      </h2>

      {/* Form */}
      <form
        onSubmit={isEditMode ? handlerEditSubmit : handleAddSubmit}
        className="space-y-5"
      >
        {["firstname", "lastname", "address", "contact"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize text-gray-700 mb-1">
              {field.replace("name", " Name")}
            </label>
            <input
              type={field === "contact" ? "tel" : "text"}
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
        >
          {loading
            ? isEditMode
              ? "Updating..."
              : "Adding..."
            : isEditMode
            ? "Update Profile"
            : "Add Profile"}
        </button>
      </form>
    </div>
  );
}
