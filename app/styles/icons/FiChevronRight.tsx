import React from "react";

function Icon({ mode }: { mode: "dark" | "light" }) {
  return (
    <svg
      width="10"
      height="15"
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: mode === "dark" ? "invert(1)" : "invert(0)",
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.750731 0.410704C1.07617 0.0852667 1.6038 0.0852667 1.92924 0.410704L6.92924 5.4107C7.25468 5.73614 7.25468 6.26378 6.92924 6.58921L1.92924 11.5892C1.6038 11.9147 1.07617 11.9147 0.750731 11.5892C0.425294 11.2638 0.425294 10.7361 0.750731 10.4107L5.16148 5.99996L0.750731 1.58921C0.425294 1.26378 0.425294 0.736141 0.750731 0.410704Z"
        fill="black"
      />
    </svg>
  );
}

export default Icon;
