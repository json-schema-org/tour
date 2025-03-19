import React from "react";

function Icon({
  colorMode,
  color,
}: {
  colorMode?: "dark" | "light";
  color: string;
}) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: colorMode === "dark" ? "invert(1)" : "invert(0)",
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.83439 9.7656C3.68441 9.61557 3.60016 9.41213 3.60016 9.2C3.60016 8.98786 3.68441 8.78442 3.83439 8.6344L6.46879 6L3.83439 3.3656C3.68866 3.21471 3.60803 3.01263 3.60985 2.80288C3.61167 2.59312 3.69581 2.39247 3.84413 2.24414C3.99246 2.09581 4.19311 2.01168 4.40287 2.00986C4.61262 2.00803 4.81471 2.08867 4.96559 2.2344L8.16559 5.4344C8.31556 5.58442 8.39982 5.78786 8.39982 6C8.39982 6.21213 8.31556 6.41557 8.16559 6.5656L4.96559 9.7656C4.81557 9.91557 4.61212 9.99983 4.39999 9.99983C4.18786 9.99983 3.98441 9.91557 3.83439 9.7656Z"
        className="nextIcon"
        fill={color}
      />
    </svg>
  );
}

export default Icon;
