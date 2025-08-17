"use client";
import { useState } from "react";

export default function SettingsSection({ page, setPage }) {
  const options = [
    { id: "cart", label: "Cart" },
    { id: "password", label: "Change Password" },
    { id: "info", label: "Change Profile Info" },
  ];

  const [selected, setSelected] = useState(page);

  const handleChange = (value) => {
    setSelected(value);
    setPage(value);
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Settings</h2>

      {/* Mobile: Dropdown */}
      <div className="sm:hidden">
        <select
          value={selected}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300"
        >
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop: Button List */}
      <div className="hidden sm:block space-y-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleChange(opt.id)}
            className={`w-full py-2.5 px-4 rounded-lg font-medium transition duration-200 
              ${
                page === opt.id
                  ? "bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              } focus:ring-4 focus:ring-blue-300`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
