"use client";

import { useState, useEffect } from "react";
import CategoryFunctions from "@/app/components/functions/CategoryFunctions";
import { ProductFunctions } from "@/app/components/functions/ProductFunctions";

export default function useProductHandlers() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isConfirm, setConfirm] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    category: "",
    price: "",
    stock: "",
    status: "Active",
  });

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "" });

  const fetchCategories = async () => {
    const res = await CategoryFunctions();
    if (res.success) {
      setCategories(res.data);
    } else {
      setError(res.err || "Failed to fetch categories");
    }
  };

  const fetchProducts = async () => {
    const result = await ProductFunctions();
    if (result.success) {
      setProducts(result?.data?.data || []);
    } else {
      setError(result.err || "Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const handleInputChange = (field, value) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategoryInputChange = (field, value) => {
    setNewCategory((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      const product = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        ...newProduct,
        stock: parseInt(newProduct.stock) || 0,
      };
      setProducts((prev) => [...prev, product]);
      handleCloseModal();
    }
  };

  const handleUpdateProduct = () => {
    const updatedProducts = products.map((p) =>
      p.id === editingProductId
        ? { ...p, ...newProduct, stock: parseInt(newProduct.stock) || 0 }
        : p
    );
    setProducts(updatedProducts);
    handleCloseModal();
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setEditingProductId(product.id);
    setNewProduct({
      name: product.name || "",
      image: product.image || "",
      category: product.category || "",
      price: product.price || "",
      stock: product.stock || "",
      status: product.status || "Active",
    });
    setIsModalOpen(true);
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim() !== "") {
      const newCat = {
        id: Math.max(...categories.map((c) => c.id), 0) + 1,
        name: newCategory.name,
      };
      setCategories((prev) => [...prev, newCat]);
      setNewCategory({ name: "" });
      setIsCategoryModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingProductId(null);
    setNewProduct({
      name: "",
      image: "",
      category: "",
      price: "",
      stock: "",
      status: "Active",
    });
  };

  const handleDeleteProduct = (productId) => {
    try {
      DeleteProduct(productId);
    } catch (error) {
      console.log(error);
    } finally {
      setConfirm("");
      fetchProducts();
    }
  };

  return {
    isConfirm,
    setConfirm,
    products,
    categories,
    newProduct,
    newCategory,
    isModalOpen,
    isEditing,
    isCategoryModalOpen,
    setIsModalOpen,
    setIsCategoryModalOpen,
    handleInputChange,
    handleCategoryInputChange,
    handleAddProduct,
    handleUpdateProduct,
    handleEditProduct,
    handleAddCategory,
    handleCloseModal,
    fetchProducts,
    fetchCategories,
    handleDeleteProduct,
  };
}
