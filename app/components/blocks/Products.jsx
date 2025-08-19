"use client";

import React, { useEffect, useState } from "react";
import { ProductFunctions } from "../functions/ProductFunctions";
import Image from "next/image";
import searchState from "@/app/store/searchState";
import { AddToCartModal } from "@/app/popups/addToCartModal";
import Link from "next/link";

const FALLBACK_IMAGE = "/images/fallback.png";

// 🔹 Skeleton Loader
function ProductSkeleton() {
  return (
    <div className="bg-white shadow-md rounded-2xl text-center border border-gray-200 animate-pulse">
      <div className="relative w-full mb-2 h-[150px] bg-gray-200 rounded-t-2xl"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
      <div className="p-2">
        <div className="h-8 bg-gray-200 rounded-md w-full" />
      </div>
    </div>
  );
}

export function Products() {
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // 🔹 new state

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

  const visibleProducts = showAll ? products : products.slice(0, 20);

  const uniqueProducts = visibleProducts.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (prod) => prod.name.toLowerCase() === item.name.toLowerCase()
      )
  );

  const handleAddToCartClick = (product) => {
    const sameNameProducts = products.filter(
      (item) => item.name === product.name
    );
    setSelectedProducts(sameNameProducts);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 pt-4">
      <div className="uppercase text-center border-t-8 bg-gray-100 py-4 text-[22px] text-primary font-bold border-primary w-full tracking-wide">
        Discover More
      </div>

      <div className="py-4 mb-8">
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loading
                ? // 🔹 Show skeletons while loading
                  Array.from({ length: 8 }).map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))
                : uniqueProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white shadow-md rounded-2xl text-center border border-gray-200 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleAddToCartClick(product)}
                    >
                      <div className="relative w-full mb-2 h-[150px]">
                        <Image
                          src={product.image || FALLBACK_IMAGE}
                          alt={product.name || "Product"}
                          width={500}
                          height={500}
                          className="object-fill rounded-t-2xl h-full w-full"
                        />
                      </div>
                      <div className="font-semibold uppercase text-sm">
                        {product.name}
                      </div>
                      <div className="w-full flex justify-center p-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCartClick(product);
                          }}
                          className="text-xs text-white font-bold uppercase"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
            </div>

            {!loading && products.length > 20 && (
              <div className="text-center mt-6">
                <Link
                  href={`/products`}
                  className="px-4 py-2 text-white text-[18px] font-bold transition bg-blue-500"
                >
                  Show More
                </Link>
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
