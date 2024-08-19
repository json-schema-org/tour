"use client";

import React from "react";
import { useColorMode } from "@chakra-ui/react";

export default function Icon() {
  const { colorMode } = useColorMode();

  return (
    <link
      rel="icon"
      type="image/svg+xml"
      href={colorMode === "dark" ? "/logos/icon-black.ico" : "/logos/icon.ico"}
      id="light-scheme-icon"
    />
  );
}
