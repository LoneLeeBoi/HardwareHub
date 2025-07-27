import { Plus } from "@/public/icons/plus";
import React from "react";

export default function Page(props) {
  const products = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=100&h=100&fit=crop&crop=center",
      name: "Cordless Drill",
      category: "Power Tools",
      price: "$89.99",
      stock: 30,
      status: "Active",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1609205254145-eb3c99c6bc04?w=100&h=100&fit=crop&crop=center",
      name: "Adjustable Wrench Set",
      category: "Hand Tools",
      price: "$29.99",
      stock: 50,
      status: "Active",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center",
      name: "Digital Caliper",
      category: "Measuring Tools",
      price: "$45.50",
      stock: 10,
      status: "Low Stock",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1609205274214-b7ee3e8c0f2a?w=100&h=100&fit=crop&crop=center",
      name: "Screwdriver Set",
      category: "Hand Tools",
      price: "$19.99",
      stock: 65,
      status: "Active",
    },
  ];

  // Sample data for categories
  const categories = [
    {
      id: 1,
      name: "Power Tools",
      productCount: 15,
      status: "Active",
    },
    {
      id: 2,
      name: "Hand Tools",
      productCount: 40,
      status: "Active",
    },
    {
      id: 3,
      name: "Measuring Tools",
      productCount: 12,
      status: "Active",
    },
    {
      id: 4,
      name: "Fasteners",
      productCount: 25,
      status: "Active",
    },
  ];
  return (
    <div className="p-4 container">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">PRODUCTS</h2>

      {/* Action Buttons */}
      <div className="flex gap-4 w-fit mb-6">
        {/* Add Product Button */}
        <div className="flex items-center gap-3 px-6 py-3 bg-gray-100 hover:bg-blue-700 text-gray-700 hover:text-white rounded-lg font-xs font-black transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer">
          <Plus className="size-5 stroke-3" />
          PRODUCT
        </div>
        {/* Add Category Button */}
        <div className="flex items-center gap-3 px-6 py-3 bg-gray-100 hover:bg-blue-700 text-gray-700 hover:text-white rounded-lg font-xs font-black transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer">
          <Plus className="size-5 stroke-3" />
          CATEGORY
        </div>
      </div>

      {/* Tables Container - Changed to flex-col */}
      <div className="flex flex-col gap-6">
        {/* Products Table - Full width */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Products</h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
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
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {product.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {product.stock}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Categories Table - Full width */}
        <div className="w-full">
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
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {category.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {category.productCount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {category.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}