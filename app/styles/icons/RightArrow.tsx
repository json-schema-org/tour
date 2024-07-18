import React from "react";

function Icon({ colorMode }: { colorMode?: "dark" | "light" }) {
  return (
    <svg
      style={{
        filter: colorMode === "dark" ? "invert(1)" : "invert(0)",
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="22"
      fill="none"
      viewBox="0 0 21 22"
    >
      <path
        fill="#fff"
        d="M8.44 18.94l2.12 2.12L20.621 11 10.561.94 8.44 3.06l6.439 6.44H.5v3h14.379l-6.44 6.44z"
      ></path>
    </svg>
  );
}

export default Icon;
