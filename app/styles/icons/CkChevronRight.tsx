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
        d="M2.00003 0L0.590027 1.41L5.17003 6L0.590027 10.59L2.00003 12L8.00003 6L2.00003 0Z"
        fill="black"
      />
    </svg>
  );
}

export default Icon;
