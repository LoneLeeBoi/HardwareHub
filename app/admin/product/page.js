"use client";

import React, { useState } from "react";
import { AddProductModal } from "@/app/popups/addProductModal";
import { AddCategoryModal } from "@/app/popups/addCategoryModal";
import { ConfirmationModal } from "@/app/popups/confirmationModal";
import { Plus } from "@/public/icons/plus";
import { Edit } from "@/public/icons/edit";
import { Trash } from "@/public/icons/trash";
import useProductHandlers from "./productHandlers";

export default function Page() {
  const {
    isConfirm,
    products,
    categories,
    newProduct,
    newCategory,
    isModalOpen,
    isEditing,
    isCategoryModalOpen,
    isEditingCategory,
    editCategoryId,
    isCategoryFormOpen,
    setConfirm,
    setEditCategoryId,
    setIsEditingCategory,
    setIsModalOpen,
    setIsCategoryModalOpen,
    handleInputChange,
    handleCategoryInputChange,
    handleAddProduct,
    handleUpdateProduct,
    handleEditProduct,
    handleCloseModal,
    fetchProducts,
    fetchCategories,
    handleDeleteProduct,
    handleDeleteCategory,
    handleEditCategory,
    setIsEditing,
    setNewCategory,
  } = useProductHandlers();

  const [isCatConfirm, setIsCatConfirm] = useState("");

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };
  return (
    <div className="p-4 container">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">PRODUCTS</h2>

      <div className="flex gap-4 w-fit mb-6">
        <div
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="flex items-center gap-3 px-6 py-3 bg-gray-100 hover:bg-blue-700 text-gray-700 hover:text-white rounded-lg font-xs font-black transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          <Plus className="size-5 stroke-3" />
          PRODUCT
        </div>

        <div
          onClick={() => setIsCategoryModalOpen(true)}
          className="flex items-center gap-3 px-6 py-3 bg-gray-100 hover:bg-blue-700 text-gray-700 hover:text-white rounded-lg font-xs font-black transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          <Plus className="size-5 stroke-3" />
          CATEGORY
        </div>
        {isCategoryFormOpen && (
          <div className="h-full w-screen fixed top-0 left-0 flex items-center justify-center">
            <span
              className="fixed top-0 left-0 bg-black/40 w-screen h-full"
              onClick={closeCategoryForm}
            />
            <CategoryForm />
          </div>
        )}
      </div>

      <div className="flex gap-6">
        <div className="w-3/4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Products</h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium capitalize">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <p>{product.category_name}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.units}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <div
                        onClick={() => {
                          handleEditProduct(product);
                          setIsEditing(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <Edit className="size-5" />
                      </div>
                      <div
                        onClick={() => setConfirm(product.id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash className="size-5" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full flex-1">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Categories
          </h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories?.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap uppercase font-bold">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <div
                        onClick={() => handleEditCategory(category)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <Edit className="size-5" />
                      </div>
                      <div
                        onClick={() => setIsCatConfirm(category.id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash className="size-5" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        newProduct={newProduct}
        handleInputChange={handleInputChange}
        handleAddProduct={handleAddProduct}
        handleUpdateProduct={handleUpdateProduct}
        isEditing={isEditing}
        categories={categories}
        refreshProducts={fetchProducts}
      />

      <ConfirmationModal
        isOpen={isConfirm || isCatConfirm}
        onClose={() => {
          if (isConfirm) {
            setConfirm("");
          } else if (isCatConfirm) {
            setIsCatConfirm("");
          }
        }}
        onConfirm={() => {
          if (isConfirm) {
            handleDeleteProduct(isConfirm);
            setConfirm("");
          } else if (isCatConfirm) {
            handleDeleteCategory(isCatConfirm);
            setIsCatConfirm("");
          }
        }}
        title="Are you sure?"
        message="This action cannot be undone."
      />

      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setEditCategoryId(null);
          setIsEditingCategory(false);
          setNewCategory({ id: "", name: "" });
        }}
        newCategory={newCategory}
        handleInputChange={handleCategoryInputChange}
        refreshCategories={fetchCategories}
        isEditing={isEditingCategory}
        isEditingCategory={isEditingCategory}
        editCategoryId={editCategoryId}
      />
    </div>
  );
}