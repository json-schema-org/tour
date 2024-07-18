import React from "react";

function Icon({ colorMode }: { colorMode?: "dark" | "light" }) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: colorMode === "dark" ? "invert(1)" : "invert(0)",
      }}
    >
      <path
        d="M7.41 1.41L6 0L0 6L6 12L7.41 10.59L2.83 6L7.41 1.41Z"
        fill="black"
      />
    </svg>
  );
}

export default Icon;
