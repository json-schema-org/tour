import React from "react";

export default function GoCheck({ isActive }: { isActive: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 7.5L9 19.5L3 13.5L5.25 11.25L9 15L18.75 5.25L21 7.5Z"
        fill={isActive ? "hsl(var(--background))" : "hsl(var(--primary))"}
      />
    </svg>
  );
}
