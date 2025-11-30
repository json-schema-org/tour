"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import styles from "./styles/page.module.css";
import classnames from "classnames";

import { useEffect, useState } from "react";
import { outfitFont } from "./styles/fonts";

const MOBILE_BREAKPOINT = 768;

export function Providers({ children }: { children: React.ReactNode }) {
  // 1. Initialize state for mobile status
  const [isMobile, setIsMobile] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // 2. Function to check the screen width
    const checkMobileStatus = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
      setHasChecked(true);
    };

    checkMobileStatus();


    window.addEventListener('resize', checkMobileStatus);

    return () => {
      window.removeEventListener('resize', checkMobileStatus);
    };
  }, []);

  if (!hasChecked) {
    return null;
  }

  if (!isMobile) {
    return (
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    );
  }

  return (
    <div className={styles.main}>
      <div className={classnames(styles.message, outfitFont.className)}>
        We are sorry,
        <br /> 
        Tour of JSON Schema is not optimized for mobile devices. Please use a
        desktop computer for the best experience.
      </div>
    </div>
  );
}