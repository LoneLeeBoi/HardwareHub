"use client";
import React from "react";
import { Magnify } from "@/public/icons/magnify";
import searchState from "@/app/store/searchState";
import { ProductFunctions } from "@/app/components/functions/ProductFunctions";

export function Search() {
  const searchParams = searchState((state) => state.searchParams);
  const setSearchParams = searchState((state) => state.setSearchParams);
  const setProducts = searchState((state) => state.setProducts);

  const handleSearch = async () => {
    const params = searchParams
      ? { search: searchParams, category_name: searchParams }
      : {};
    const result = await ProductFunctions(params);

    if (result.success) {
      setProducts(result.data.data || []);
    } else {
      console.error("Search failed:", result.err);
      setProducts([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchParams}
        onChange={(e) => setSearchParams(e.target.value)}
        onKeyUp={handleKeyDown}
        placeholder="Search..."
        className="w-full pl-3 pr-10 py-2 text-sm bg-transparent border-none outline-none"
        style={{
          padding: "0.5rem",
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          borderRadius: "0",
          boxShadow: "none",
        }}
      />

      <div
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        onClick={handleSearch}
      >
        <Magnify className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  );
}
