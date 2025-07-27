import React from "react";

export function Plus(props) {
  return (
    <>
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className={props?.className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </>
  );
}
