"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import searchState from "@/app/store/searchState";
import { AddToCartModal } from "@/app/popups/addToCartModal";
import { ProductFunctions } from "../components/functions/ProductFunctions";

const FALLBACK_IMAGE = "/images/fallback.png";

// 🔹 Skeleton Loader Component
function ProductSkeleton() {
  return (
    <div className="bg-white shadow-md rounded-xl text-center border border-gray-200 animate-pulse">
      <div className="relative w-full h-[150px] mb-2 bg-gray-200 rounded-lg"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
      <div className="p-2">
      <div className="h-8 bg-gray-200 rounded w-full"/>
      </div>
    </div>
  );
}

export default function Page() {
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // 🔹 add loading state

  const setProducts = searchState((state) => state.setProducts);
  const products = searchState((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const result = await ProductFunctions({ limit: 20 });

      if (result.success) {
        const data = result?.data?.data || [];
        setProducts(data);
      } else {
        setError(result.err || "Failed to fetch products.");
      }
      setLoading(false);
    };

    fetchProducts();
  }, [setProducts]);

  // Show all or first 20
  const visibleProducts = showAll ? products : products.slice(0, 20);

  // Remove duplicate names for display
  const uniqueProducts = visibleProducts.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (prod) => prod.name.toLowerCase() === item.name.toLowerCase()
      )
  );

  // Group same name products when clicked
  const handleAddToCartClick = (product) => {
    const sameNameProducts = products.filter(
      (item) => item.name === product.name
    );

    setSelectedProducts(sameNameProducts);
    setIsModalOpen(true);
  };

  return (
    <div className="container my-4 px-4">
      {/* Header */}
      <div className="uppercase text-center border-t-8 bg-gray-300 py-4 text-[20px] text-primary font-bold border-primary w-full">
        discover more
      </div>

      <div className="py-4 ">
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {loading
                ? Array.from({ length: 10 }).map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))
                : uniqueProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white shadow-md rounded-xl text-center border border-gray-200 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleAddToCartClick(product)}
                    >
                      {/* Product Image */}
                      <div className="relative w-full h-[150px] mb-2">
                        <Image
                          src={product.image || FALLBACK_IMAGE}
                          alt={product.name || "Product"}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>

                      {/* Product Name */}
                      <div className="font-semibold uppercase text-sm">
                        {product.name}
                      </div>

                      {/* Add to Cart Button */}
                      <div className="w-full flex justify-center p-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCartClick(product);
                          }}
                          className=" text-xs text-white font-black rounded"
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  ))}
            </div>

            {/* Show More Button */}
            {!loading && products.length > 20 && !showAll && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                >
                  Show More
                </button>
              </div>
            )}
          </>
        )}

        {/* Add to Cart Modal */}
        <AddToCartModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProducts}
        />
      </div>
    </div>
  );
}
