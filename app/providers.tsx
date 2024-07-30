"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.innerWidth < 768 && !window.location.href.includes("/mobile")) {
      window.location.href = "/mobile";
    }
  }, []);

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
