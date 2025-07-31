"use client";
import React, { useState } from "react";
import { Plus } from "@/public/icons/plus";
import { Edit } from "@/public/icons/edit";
import { Trash } from "@/public/icons/trash";
import { AddStockModal } from "@/app/popups/addStockModal";
import { ConfirmationModal } from "@/app/popups/confirmationModal";
import Functions from "./functions";

export default function Page() {
  const {
    isOpen,
    setOpen,
    isEdit,
    setEdit,
    productData,
    setProduct,
    isConfirmOpen,
    setConfirmOpen,
    lowStockProducts,
    regularStockProducts,
  } = Functions();

  const TableHeader = () => (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Product Name
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Acquisition Price
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Retail Price
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Original Stock
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Remaining Stock
        </th>
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );

  const ProductRow = ({ product, isLowStockItem = false }) => (
    <tr
      key={product.id}
      className={`hover:bg-gray-50 ${
        isLowStockItem ? "bg-red-50 hover:bg-red-100" : ""
      }`}
    >
      <td className="px-4 py-4 whitespace-nowrap font-medium capitalize">
        {product.name}
      </td>
      <td className="px-4 py-4 whitespace-nowrap font-semibold text-green-600">
        ${product.acquisitionCost.toFixed(2)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap font-semibold text-blue-600">
        ${product.retailCost.toFixed(2)}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-gray-700">
        {product.stock}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <span
          className={`font-medium ${
            isLowStockItem ? "text-red-600" : "text-gray-900"
          }`}
        >
          {product.remainingStock}
        </span>
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex gap-2">
          <div
            onClick={() => {
              setOpen(true);
              setEdit(true);
              setProduct(product);
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md transition-colors duration-200 font-medium"
          >
            <Edit className="size-4" />
            Add Stock
          </div>
          <div
            onClick={() => setConfirmOpen(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors duration-200 font-medium"
          >
            <Trash className="size-4" />
            Delete
          </div>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-4 container">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">INVENTORY</h2>
      <div className="flex gap-4 w-fit mb-6">
        <div
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 px-6 py-3 bg-gray-100 hover:bg-blue-700 text-gray-700 hover:text-white rounded-lg font-xs font-black transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          <Plus className="size-5 stroke-3" />
          PRODUCT
        </div>
      </div>

      {lowStockProducts.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold text-red-600">
              Low Stock Alert
            </h3>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {lowStockProducts.length} items
            </span>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-red-200 overflow-hidden">
            <table className="w-full">
              <TableHeader />
              <tbody className="bg-white divide-y divide-gray-200">
                {lowStockProducts.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    isLowStockItem={true}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Regular Stock Products Table */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          All Products
        </h3>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <TableHeader />
            <tbody className="bg-white divide-y divide-gray-200">
              {regularStockProducts.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddStockModal
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        // handleSubmit={handleSubmit}
        isEdit={isEdit}
        productData={productData}
      />

      <AddStockModal
        isOpen={isOpen}
        handleClose={() => setOpen(false)}
        // handleSubmit={handleSubmit}
        isEdit={isEdit}
        productData={productData}
      />

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        // onConfirm={handleSubmitDelete}
      />
    </div>
  );
}