"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import searchState from "@/app/store/searchState";
import CategoryFunctions from "../functions/CategoryFunctions";

export function CategorySelection() {
  const searchParams = searchState((state) => state.searchParams);

  const [categories, setCategories] = useState([]);
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

  return (
    <div className="py-6 px-4">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Select a Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() =>
              searchState.setState({ searchParams: category.name })
            }
            className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center hover:shadow-md hover:scale-[1.03] transition-all duration-200 ease-in-out cursor-pointer"
          >
            <div className=" text-center font-black text-sm text-gray-700 uppercase tracking-wide">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
