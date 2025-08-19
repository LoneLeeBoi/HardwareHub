"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import searchState from "@/app/store/searchState";
import CategoryFunctions from "../functions/CategoryFunctions";

export function CategorySelection() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const res = await CategoryFunctions();

      if (res.success) {
        setCategories(res.data);
        setLoading(false);
      } else {
        setError(res.err || "Failed to fetch categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryName) => {
    try {
      searchState.setState({ searchParams: categoryName });

      const res = await axios.get("/api/product", {
        params: { category_name: categoryName },
      });
      searchState.setState({ products: res?.data?.data });
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products.");
    }
  };

  return (
    <div className="pt-6">
      <h2 className="text-2xl sm:text-3xl font-bold font-wix mb-6">
        Select a Category
      </h2>

      <div>
        {/* Mobile: Select */}
        <div className="block sm:hidden">
          {isLoading ? (
            <div className="w-full border rounded-lg p-3 animate-pulse bg-gray-500 h-12" />
          ) : (
            <select
              onChange={(e) => handleCategoryClick(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
          {isLoading
            ? Array.from({ length: 7 }).map((_, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4 flex flex-col items-center animate-pulse"
                >
                  <div className="h-12 w-20 bg-gray-200 rounded" />
                </div>
              ))
            : categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.name)}
                  className="border rounded-lg p-4 flex flex-col items-center hover:shadow transition cursor-pointer"
                >
                  <div className="text-center font-bold text-sm uppercase flex items-center h-full">
                    {category.name}
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Display fetched products (optional) */}
      <div className="mt-8">
        {products.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-2">Products:</h3>
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product.id} className="border p-2 rounded">
                  {product.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
}
