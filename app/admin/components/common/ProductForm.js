"use client";

import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useModalStore } from "@/app/store/modalStore";
import CloseForm from "@/public/icons/CloseForm";
import { toast } from "react-toastify";
export default function ProductForm({ onSubmit }) {
  const { closeProductForm } = useModalStore();
  const { setSuccessProduct } = useModalStore();

  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    price: "",
    category_id: "",
    units: "",
    image: null, // image file
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/product/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt.decode(token);
        setFormData((prev) => ({ ...prev, user_id: decoded?.id }));
      } catch (err) {
        console.error("Token decode error:", err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("user_id", formData.user_id);
    uploadData.append("name", formData.name);
    uploadData.append("price", formData.price);
    uploadData.append("category_id", formData.category_id);
    uploadData.append("units", formData.units);
    if (formData.image) uploadData.append("image", formData.image);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/product", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadData,
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Upload failed:", err);
        return;
      }

      const result = await res.json();
      console.log("Success:", result);
      toast.success("Product created successfully!");
      onSubmit?.(result); // <-- trigger the callback passed from parent
      closeProductForm();
      setSuccessProduct(true);
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md space-y-4 w-full max-w-md z-10"
      encType="multipart/form-data"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Add New Product</h2>
        <span onClick={closeProductForm}>
          <CloseForm />
        </span>
      </div>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full border px-3 py-2 rounded"
        required
      />

      <select
        name="category_id"
        value={formData.category_id}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      >
        <option value="">Select Category</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <input
        name="units"
        value={formData.units}
        onChange={handleChange}
        placeholder="Units (e.g., box, pcs)"
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <div className="flex items-center justify-center gap-[8px]">
        <button
          type="button"
          onClick={closeProductForm}
          className="border px-4 py-2 rounded hover:bg-red-500 w-full hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#1D9519] text-white px-4 py-2 rounded hover:bg-[#157112] w-full"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}
