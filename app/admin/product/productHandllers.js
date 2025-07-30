"use client";

import { useState, useEffect } from "react";
import CategoryFunctions, {
  DeleteCategory,
  EditCategory,
} from "@/app/components/functions/CategoryFunctions";
import {
  DeleteProduct,
  ProductFunctions,
  EditProduct,
} from "@/app/components/functions/ProductFunctions";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";

export default function useProductHandlers() {
  // ==============================
  // States
  // ==============================
  const [userId, setUserId] = useState("");

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    category_id: "",
    price: "",
    stock: "",
    status: "Active",
    user_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    id: "",
    name: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [isConfirm, setConfirm] = useState();

  // ==============================
  // Effects
  // ==============================
  useEffect(() => {
    const decoded = jwt.decode(localStorage.getItem("token"));
    setUserId(decoded?.id || "");
    fetchCategories();
    fetchProducts();
  }, []);

  // ==============================
  // Fetchers
  // ==============================
  const fetchCategories = async () => {
    const res = await CategoryFunctions();
    res.success
      ? setCategories(res.data)
      : toast.error(res.err || "Failed to fetch categories");
  };

  const fetchProducts = async () => {
    const res = await ProductFunctions();
    res.success
      ? setProducts(res.data?.data || [])
      : toast.error(res.err || "Failed to fetch products");
  };

  // ==============================
  // Handlers: Input
  // ==============================
  const handleInputChange = (field, value) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategoryInputChange = (field, value) => {
    setNewCategory((prev) => ({ ...prev, [field]: value }));
  };

  // ==============================
  // Product Actions
  // ==============================
  const handleAddProduct = async () => {
    try {
      toast.success("Product added successfully");
      handleCloseModal();
      fetchProducts();
    } catch {
      toast.error("Failed to add product");
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await EditProduct(editingProductId, newProduct);
      toast.success("Product updated successfully");
      handleCloseModal();
      fetchProducts();
    } catch {
      toast.error("Failed to update product");
    }
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setEditingProductId(product.id);
    setNewProduct({
      id: product.id || "",
      name: product.name || "",
      image: product.image || "",
      category_id: product.category_id || "",
      price: product.price || "",
      stock: product.stock || "",
      status: product.status || "Active",
      user_id: product.user_id || "",
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const success = await DeleteProduct(id);
      if (success) toast.success("Product deleted.");
    } catch {
      toast.error("Failed to delete product");
    } finally {
      fetchProducts();
      setConfirm("");
    }
  };

  // ==============================
  // Category Actions
  // ==============================
  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return;

    const newCat = {
      id: Math.max(...categories.map((c) => c.id), 0) + 1,
      name: newCategory.name,
    };

    setCategories((prev) => [...prev, newCat]);
    setNewCategory({ id: "", name: "" });
    setIsCategoryModalOpen(false);
  };

  const handleEditCategory = (category) => {
    setNewCategory({ id: category.id, name: category.name });
    setEditCategoryId(category.id);
    setIsCategoryModalOpen(true);
    setIsEditingCategory(true);
  };

  const handleUpdateCategory = async () => {
    if (!editCategoryId) return;

    try {
      await EditCategory(editCategoryId, newCategory.name);
      toast.success("Category updated.");
    } catch {
      toast.error("Update failed");
    } finally {
      fetchCategories();
      setEditCategoryId(null);
      setIsEditingCategory(false);
      setIsCategoryModalOpen(false);
      setNewCategory({ id: "", name: "" });
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const success = await DeleteCategory(id);
      if (success) toast.success("Category deleted.");
    } catch {
      toast.error("Delete failed");
    } finally {
      fetchCategories();
      setIsCategoryModalOpen(false);
    }
  };

  // ==============================
  // Utility
  // ==============================
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingProductId(null);
    setNewProduct({
      name: "",
      image: "",
      category_id: "",
      price: "",
      stock: "",
      status: "Active",
      user_id: "",
    });
  };

  // ==============================
  // Return Hook API
  // ==============================
  return {
    products,
    categories,
    newProduct,
    newCategory,
    isModalOpen,
    isEditing,
    isCategoryModalOpen,
    isEditingCategory,
    isConfirm,
    editCategoryId,

    setConfirm,
    setIsModalOpen,
    setIsEditing,
    setIsCategoryModalOpen,
    setIsEditingCategory,
    setEditCategoryId,
    setNewCategory,

    handleInputChange,
    handleAddProduct,
    handleUpdateProduct,
    handleEditProduct,
    handleDeleteProduct,

    handleCategoryInputChange,
    handleAddCategory,
    handleEditCategory,
    handleUpdateCategory,
    handleDeleteCategory,

    handleCloseModal,
    fetchProducts,
    fetchCategories,
  };
}
