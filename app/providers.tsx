"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider resetCSS={false} theme={theme}>
      {children}
    </ChakraProvider>
  );
}
