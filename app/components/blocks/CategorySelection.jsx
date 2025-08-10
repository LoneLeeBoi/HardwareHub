"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import searchState from "@/app/store/searchState";
import CategoryFunctions from "../functions/CategoryFunctions";

export function CategorySelection() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await CategoryFunctions();

      if (res.success) {
        setCategories(res.data);
      } else {
        setError(res.err || "Failed to fetch categories");
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
    <div className="py-4">
      <h2 className="text-[30px] font-bold mb-4">Select a Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {categories.map((category) => (
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
