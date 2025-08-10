"use client";

import React, { useEffect, useState } from "react";
import {
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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const success = await EditUser(formData);
    toast[success ? "success" : "error"](
      success ? "Profile updated successfully" : "Failed to update profile"
    );

    if (success) {
      localStorage.setItem("user_details", JSON.stringify(formData));
    }

    setLoading(false);
  };

  const fetchDetails = async (id) => {
    try {
      const res = await GetDetails(id);
      localStorage.setItem("user_details", JSON.stringify(res));
      setFormData(res);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user_details");
    const id = localStorage.getItem("id");

    if (storedUser) {
      setFormData(JSON.parse(storedUser));
    } else if (id) {
      fetchDetails(id);
    }
  }, []);

  return (
    <div className="flex-1 mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["firstname", "lastname", "address", "contact"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize">
              {field.replace("name", " Name")}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
