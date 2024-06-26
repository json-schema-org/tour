import React from "react";

function Icon({ colorMode }: { colorMode: "light" | "dark" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      style={{
        transform: "scale(1.3)",
        filter: colorMode === "dark" ? "invert(1)" : "invert(0)",
      }}
      viewBox="0 0 24 24"
    >
      <path
        fill="#000"
        d="M6.993 12A5.013 5.013 0 0012 17.007 5.013 5.013 0 0017.007 12 5.013 5.013 0 0012 6.993 5.013 5.013 0 006.993 12zM12 8.993A3.01 3.01 0 0115.007 12 3.01 3.01 0 0112 15.007 3.01 3.01 0 018.993 12 3.01 3.01 0 0112 8.993zM10.998 19h2v3h-2v-3zm0-17h2v3h-2V2zm-9 9h3v2h-3v-2zm17 0h3v2h-3v-2zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122-1.415-1.414zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122-1.414-1.414zM6.342 7.759L4.22 5.637l1.415-1.414 2.12 2.122-1.413 1.414zm13.434 10.605l-1.414 1.414-2.122-2.122 1.414-1.414 2.122 2.122z"
      ></path>
    </svg>
  );
}

export default Icon;
