"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { useEffect,useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // useEffect(() => {
  //   if (window.innerWidth < 768 && !window.location.href.includes("/mobile")) {
  //     window.location.href = "/mobile";
  //   }
  // }, []);
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated?<ChakraProvider theme={theme}>{children}</ChakraProvider>:null;
}
