import React from "react";

export function Chevron(props) {
  return (
    <>
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className={props?.className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 15.75 7.5-7.5 7.5 7.5"
        />
      </svg>
    </>
  );
}
