"use client";
import React from "react";
import { Chevron } from "@/public/icons/chevron";

function PaginationButton({
  children,
  onClick,
  disabled,
  active,
  className = "",
}) {
  return (
    <div
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center border border-gray-300 text-sm 
        ${active ? "bg-blue-500 text-white" : "bg-white"} 
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 !text-black"} 
        ${className}`}
    >
      {children}
    </div>
  );
}

function getVisiblePages(currentPage, totalPages) {
  const pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
  }

  return pages;
}

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 bg-white p-4  ">
      {/* Previous Button */}
      <PaginationButton
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="rounded-full w-10 h-10 p-0"
      >
        <Chevron className="w-4 h-4 rotate-90" />
      </PaginationButton>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-2 text-gray-400 text-sm">...</span>
            ) : (
              <PaginationButton
                onClick={() => setCurrentPage(page)}
                active={currentPage === page}
                className="rounded-full w-10 h-10 p-0"
              >
                {page}
              </PaginationButton>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <PaginationButton
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage >= totalPages}
        className="rounded-full w-10 h-10 p-0"
      >
        <Chevron className="w-4 h-4 -rotate-90" />
      </PaginationButton>
    </div>
  );
}
