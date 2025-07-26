// components/DropdownWithTooltip.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";

export default function DropdownWithTooltip({ trigger, tooltip, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block group" ref={ref}>
      {/* Trigger with tooltip on hover */}
      <div onClick={() => setOpen(!open)} className="cursor-pointer px-2 py-2 hover:bg-gray-200 rounded-full text-sm relative">
        {trigger}

        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
          {tooltip}
        </div>
      </div>

      {/* Dropdown content on click */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded z-50">
          {children}
        </div>
      )}
    </div>
  );
}
