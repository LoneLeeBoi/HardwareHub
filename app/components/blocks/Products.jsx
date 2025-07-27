"use client";

import React, { useEffect, useState } from "react";
import { ProductFunctions } from "../functions/ProductFunctions";
import Image from "next/image";
import searchState from "@/app/store/searchState";
import { AddToCartModal } from "@/app/popups/addToCartModal";

const FALLBACK_IMAGE = "/images/fallback.png";

export function Products() {
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setProducts = searchState((state) => state.setProducts);
  const products = searchState((state) => state.products);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await ProductFunctions();

      if (result.success) {
        const data = result?.data?.data || [];
        setProducts(data);
        console.log("Fetched products:", data);
      } else {
        setError(result.err || "Failed to fetch products.");
      }
    };

    fetchCategories();
  }, [setProducts]);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const visibleProducts = showAll ? products : products.slice(0, 20);

  return (
    <div className="container mx-auto px-4">
      {/* Discover Banner */}
      <div className="uppercase text-center border-t-8 bg-gray-100 py-4 text-[22px] text-primary font-bold border-primary w-full tracking-wide">
        Discover More
      </div>

      <div className="py-8">
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleAddToCartClick(product)}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl">
                    <Image
                      src={product.image || FALLBACK_IMAGE}
                      alt={product.name || "Product"}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Name */}
                  <div className="text-center font-medium text-sm uppercase text-gray-700 mb-2 truncate">
                    {product.name}
                  </div>

                  {/* Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent parent click
                        handleAddToCartClick(product);
                      }}
                      className="text-xs bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-full transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More */}
            {products.length > 20 && !showAll && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-opacity-80 transition"
                >
                  Show More
                </button>
              </div>
            )}
          </>
        )}

        {/* Modal */}
        <AddToCartModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
        />
      </div>
    </div>
  );
}
