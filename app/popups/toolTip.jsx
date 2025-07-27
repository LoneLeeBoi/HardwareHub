// components/Tooltip.jsx
import React from "react";

export default function Tooltip({ children, text, position = "top" }) {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-1",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-1",
    left: "right-full top-1/2 -translate-y-1/2 mr-1",
    right: "left-full top-1/2 -translate-y-1/2 ml-1",
  };

  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={`absolute z-50 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap ${positionClasses[position]}`}
      >
        {text}
      </div>
    </div>
  );
}
