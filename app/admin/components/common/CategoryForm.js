"use client";

import { useState, useEffect } from "react";
import { useCategoryModalStore } from "@/app/store/categoryStore";
import CloseForm from "@/public/icons/CloseForm";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";

export default function CategoryForm({ onSubmit }) {
  const { closeCategoryForm } = useCategoryModalStore();
  const { setSuccess } = useCategoryModalStore();
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token);
        setUserId(decoded?.id || "");
      } catch (err) {
        console.error("Token decode error:", err);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/product/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId, name }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result?.error || "Category creation failed");
        return;
      }

      toast.success("Category created successfully!");
      onSubmit?.(result); // trigger parent callback
      closeCategoryForm();
      setSuccess(true);
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md space-y-4 w-full max-w-md z-10"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Add New Category</h2>
        <span onClick={closeCategoryForm}>
          <CloseForm />
        </span>
      </div>

      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name"
        className="w-full border px-3 py-2 rounded"
        required
      />

      <div className="flex items-center justify-center gap-[8px]">
        <button
          type="button"
          onClick={closeCategoryForm}
          className="border px-4 py-2 rounded hover:bg-red-500 w-full hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#1D9519] text-white px-4 py-2 rounded hover:bg-[#157112] w-full"
        >
          Save Category
        </button>
      </div>
    </form>
  );
}
