import React from "react";

export function Close(props) {
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
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </>
  );
}
