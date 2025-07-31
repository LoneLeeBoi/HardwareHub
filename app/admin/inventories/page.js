'use client';

import React, { useState, useEffect } from 'react';

const Page = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [inventory, setInventory] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('search', search);
        if (category) queryParams.append('category', category);
        queryParams.append('page', page.toString());
        queryParams.append('limit', limit.toString());

        const res = await fetch(`http://localhost:3000/api/inventory?${queryParams}`);
        const json = await res.json();

        setInventory(json.data || []);
        setTotalPages(json.totalPages || 1);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setInventory([]);
        setTotalPages(1);
      }
    };

    fetchInventory();
  }, [search, category, page, limit]);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="p-4">
      <div className="border border-gray-200 rounded p-4">
        {/* Filter Inputs */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-1 text-sm border rounded w-full sm:w-[200px]"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <input
            type="number"
            placeholder="Category ID"
            className="p-1 text-sm border rounded w-full sm:w-[120px]"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          />
          <select
            className="p-1 text-sm border rounded w-full sm:w-[100px]"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            {[5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Unit</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Acquisition</th>
              <th className="p-2">Retail</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length > 0 ? (
              inventory.map((item) => (
                <tr key={item.id}>
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.unit}</td>
                  <td className="p-2">{item.stock}</td>
                  <td className="p-2">{item.acquisition}</td>
                  <td className="p-2">{item.retail}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-2">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 w-95"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 w-95"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;