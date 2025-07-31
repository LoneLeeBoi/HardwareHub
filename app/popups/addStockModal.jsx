import React, { useState, useEffect } from "react";
import { Close } from "@/public/icons/close";

export function AddStockModal({
  isOpen,
  handleClose,
  handleSubmit,
  isEdit,
  productData = null
}) {
  const [formData, setFormData] = useState({
    name: "",
    acquisitionCost: "",
    retailCost: "",
    stock: "",
    remainingStock: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (isEdit && productData) {
        setFormData({
          name: productData.name || "",
          acquisitionCost: productData.acquisitionCost?.toString() || "",
          retailCost: productData.retailCost?.toString() || "",
          stock: productData.stock?.toString() || "",
          remainingStock: productData.remainingStock?.toString() || ""
        });
      } else {
        setFormData({
          name: "",
          acquisitionCost: "",
          retailCost: "",
          stock: "",
          remainingStock: ""
        });
      }
      setErrors({});
    }
  }, [isOpen, isEdit, productData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.acquisitionCost || parseFloat(formData.acquisitionCost) <= 0) {
      newErrors.acquisitionCost = "Valid acquisition cost is required";
    }

    if (!formData.retailCost || parseFloat(formData.retailCost) <= 0) {
      newErrors.retailCost = "Valid retail cost is required";
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = "Valid stock quantity is required";
    }

    if (!formData.remainingStock || parseInt(formData.remainingStock) < 0) {
      newErrors.remainingStock = "Valid remaining stock is required";
    }

    if (parseInt(formData.remainingStock) > parseInt(formData.stock)) {
      newErrors.remainingStock = "Remaining stock cannot exceed original stock";
    }

    if (parseFloat(formData.acquisitionCost) >= parseFloat(formData.retailCost)) {
      newErrors.retailCost = "Retail cost should be higher than acquisition cost";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validateForm()) {
      const submitData = {
        ...formData,
        acquisitionCost: parseFloat(formData.acquisitionCost),
        retailCost: parseFloat(formData.retailCost),
        stock: parseInt(formData.stock),
        remainingStock: parseInt(formData.remainingStock)
      };
      
      if (isEdit && productData) {
        submitData.id = productData.id;
      }
      
      handleSubmit(submitData);
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
        className={`fixed right-0 top-0 z-[102] h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h2>
          <div
            onClick={handleClose}
            className="cursor-pointer text-gray-600 hover:text-gray-900"
          >
            <Close className="size-6 stroke-3" />
          </div>
        </div>
        
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-80px)]">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`mt-1 w-full rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Acquisition Cost ($) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.acquisitionCost}
              onChange={(e) => handleInputChange("acquisitionCost", e.target.value)}
              className={`mt-1 w-full rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.acquisitionCost ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0.00"
            />
            {errors.acquisitionCost && (
              <p className="text-red-500 text-xs mt-1">{errors.acquisitionCost}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Retail Cost ($) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.retailCost}
              onChange={(e) => handleInputChange("retailCost", e.target.value)}
              className={`mt-1 w-full rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.retailCost ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0.00"
            />
            {errors.retailCost && (
              <p className="text-red-500 text-xs mt-1">{errors.retailCost}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Original Stock Quantity *
            </label>
            <input
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => handleInputChange("stock", e.target.value)}
              className={`mt-1 w-full rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.stock ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0"
            />
            {errors.stock && (
              <p className="text-red-500 text-xs mt-1">{errors.stock}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Remaining Stock *
            </label>
            <input
              type="number"
              min="0"
              value={formData.remainingStock}
              onChange={(e) => handleInputChange("remainingStock", e.target.value)}
              className={`mt-1 w-full rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.remainingStock ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="0"
            />
            {errors.remainingStock && (
              <p className="text-red-500 text-xs mt-1">{errors.remainingStock}</p>
            )}
          </div>

          {/* Profit Margin Display */}
          {formData.acquisitionCost && formData.retailCost && 
           parseFloat(formData.acquisitionCost) > 0 && parseFloat(formData.retailCost) > 0 && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">
                <p>Profit per unit: 
                  <span className="font-semibold text-green-600 ml-1">
                    ${(parseFloat(formData.retailCost) - parseFloat(formData.acquisitionCost)).toFixed(2)}
                  </span>
                </p>
                <p>Profit margin: 
                  <span className="font-semibold text-blue-600 ml-1">
                    {(((parseFloat(formData.retailCost) - parseFloat(formData.acquisitionCost)) / parseFloat(formData.retailCost)) * 100).toFixed(1)}%
                  </span>
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
            >
              {isEdit ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}