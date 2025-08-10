"use client";

import React, { useState, useMemo } from "react";
import { AddProductModal } from "@/app/popups/addProductModal";
import { AddCategoryModal } from "@/app/popups/addCategoryModal";
import { ConfirmationModal } from "@/app/popups/confirmationModal";
import { Plus } from "@/public/icons/plus";
import { Edit } from "@/public/icons/edit";
import { Trash } from "@/public/icons/trash";
import useProductHandlers from "./productHandllers";
import { Magnify } from "@/public/icons/magnify";
import { ProductFunctions } from "@/app/components/functions/ProductFunctions";
import Pagination from "@/app/utils/Pagination";
import Image from "next/image";

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
    searchTerm,
    currentPage,
    totalPages,

    setSearchTerm,
    setCurrentPage,
    setProducts,
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
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [nameDefault, setNameDefault] = useState(null);
  const [categoryDefault, setCategoryDefault] = useState(null);
  useState(async() => {
        try {
      const params = { page: currentPage };

      const result = await ProductFunctions(params);
      console.log("page", currentPage)
      if (result.success) {
        setProducts(result.data.data || []);
      } else {
        console.error("Search failed:", result.err);
        setProducts([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [currentPage]);
  const handleSearch = async () => {
    try {
      const params = searchTerm
        ? { search: searchTerm, category_name: searchTerm }
        : {};

      const result = await ProductFunctions(params);

      if (result.success) {
        setProducts(result.data.data || []);
      } else {
        console.error("Search failed:", result.err);
        setProducts([]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // Group products by name
  const groupedProducts = useMemo(() => {
    const groups = {};
    products.forEach((product) => {
      if (!groups[product.name]) {
        groups[product.name] = [];
      }
      groups[product.name].push(product);
    });
    return groups;
  }, [products]);

  return (
    <div className="p-4 container">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">PRODUCTS</h2>

      <div className="flex gap-4 w-fit overflow-hidden mb-6">
        <div
          onClick={() => setIsModalOpen(true)}
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
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Products</h3>

          <div className="mb-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="flex items-center border border-gray-300 rounded-lg pr-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
            >
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none !outline-none ring-0"
              />
              <div onClick={handleSearch}>
                <Magnify className="h-7 w-7 text-gray-500 ml-2 cursor-pointer" />
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    View
                  </th>
                  <th className=" py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Unit
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(groupedProducts).map(([name, group], index) => {
                  const firstProduct = group[0];
                  return (
                    <tr key={name} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Image
                          src={firstProduct?.image}
                          width={50}
                          height={50}
                          alt={`image product-${index}`}
                          className="h-[50px] w-[50px] object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {categories.find(
                          (c) => c.id === firstProduct.category_id
                        )?.name || "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="text-white rounded-lg  bg-green-500 hover:bg-green-600 px-3 text-xs  py-1.5 cursor-pointer"
                          onClick={() => setSelectedGroup(group)}
                        >
                          View
                        </span>
                      </td>
                      <td>
                        <div
                          onClick={() => {
                            setIsModalOpen(true);
                            setNameDefault(name);
                            setCategoryDefault(firstProduct?.category_id);
                          }}
                          className="flex items-center  justify-center text-white w-[30px] h-[30px]  p-2 bg-blue-500 hover:bg-blue-600  rounded-lg"
                        >
                          <Plus className="size-4 stroke-3 " />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>

        {/* Categories Table */}
        <div className="w-full col-span-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Categories
          </h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
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
                        <Edit className="size-6" />
                      </div>
                      <div
                        onClick={() => setIsCatConfirm(category.id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash className="size-6" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Group View Modal */}
      {selectedGroup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <h3 className="text-lg font-semibold mb-4">
              {selectedGroup[0].name}
            </h3>
            <table className="w-full border border-gray-200 rounded">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Image
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Acquisition Cost
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Retail Price
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Unit
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Stock
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedGroup.map((p) => (
                  <tr key={p.id} className="border-t ">
                    <td className="px-3 py-2">
                      <Image
                        src={p?.image}
                        width={50}
                        height={50}
                        alt={`image product-${p.id}`}
                        className="w-[50px] h-[50px] object-cover"
                      />
                    </td>

                    <td className="px-3 py-2">
                      {parseFloat(p.acquisition_cost).toFixed(2)}
                    </td>
                    <td className="px-3 py-2">
                      {parseFloat(p.price).toFixed(2)}
                    </td>
                    <td className="px-3 py-2">{p.units}</td>
                    <td className="px-3 py-2">{p.stock}</td>
                    <td className="px-3 py-2 h-full mt-3 flex gap-2">
                      <div
                        onClick={() => {
                          handleEditProduct(p);
                          setIsEditing(true);
                          setSelectedGroup(null);
                        }}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer "
                      >
                        <Edit className="size-5" />
                      </div>
                      <div
                        onClick={() => {
                          setConfirm(p.id);
                          setSelectedGroup(null);
                        }}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash className="size-5" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedGroup(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Modals */}
      <AddProductModal
        setCategoryDefault={setCategoryDefault}
        categoryDefault={categoryDefault}
        setNameDefault={setNameDefault}
        nameDefault={nameDefault}
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
          if (isConfirm) setConfirm("");
          else if (isCatConfirm) setIsCatConfirm("");
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
        editCategoryId={editCategoryId}
      />
    </div>
  );
}
