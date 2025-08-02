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
    <div className="py-4">
      <h2 className="text-[30px] font-bold mb-4">Select a Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() =>
              searchState.setState({ searchParams: category.name })
            }
            className="border rounded-lg p-4 flex flex-col items-center hover:shadow transition cursor-pointer"
          >
            <div className="text-center font-bold text-sm uppercase">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
