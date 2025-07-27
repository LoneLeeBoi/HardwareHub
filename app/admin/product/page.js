"use client";

import React, { useEffect, useState } from "react";
import CategoryFunctions from "@/app/components/functions/CategoryFunctions";
import { ProductFunctions } from "@/app/components/functions/ProductFunctions";
import { AddProductModal } from "@/app/popups/addProductModal";
import { AddCategoryModal } from "@/app/popups/addCategoryModal";
import { Plus } from "@/public/icons/plus";

export default function Page(props) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
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
      console.log("Fetched categories:", res.data);
    } else {
      setError(res.err || "Failed to fetch categories");
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const result = await ProductFunctions();
    if (result.success) {
      const data = result?.data?.data || [];
      setProducts(data);
    } else {
      setError(result.err || "Failed to fetch products.");
    }
  };
  useEffect(() => {
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
      setNewProduct({
        name: "",
        image: "",
        category: "",
        price: "",
        stock: "",
        status: "Active",
      });
      setIsModalOpen(false);
    }
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
    setNewProduct({
      name: "",
      image: "",
      category: "",
      price: "",
      stock: "",
      status: "Active",
    });
  };

  return (
    <div className="p-4 container">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">PRODUCTS</h2>

      <div className="flex gap-4 w-fit mb-6">
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
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 capitalize">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {categories.find(
                          (item) => item.id === product.category_id
                        )?.name || "Unknown"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {product.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.units}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {(() => {
                        const units = product.units;
                        let status = "";
                        let statusClass = "";
                        if (units > 10) {
                          status = "Active";
                          statusClass = "bg-green-100 text-green-800";
                        } else if (units > 0) {
                          status = "Low Stock";
                          statusClass = "bg-yellow-100 text-yellow-800";
                        } else {
                          status = "Out of Stock";
                          statusClass = "bg-gray-100 text-gray-800";
                        }
                        return (
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusClass}`}
                          >
                            {status}
                          </span>
                        );
                      })()}
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap uppercase font-bold">
                      <div className="text-sm text-gray-900">
                        {category.name}
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
        isEditing={false}
        categories={categories}
        refreshProducts={fetchProducts}
      />

      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        newCategory={newCategory}
        handleInputChange={handleCategoryInputChange}
        handleAddCategory={handleAddCategory}
        isEditing={false}
        refreshCategories={fetchCategories}
      />
    </div>
  );
}
