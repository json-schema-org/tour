"use client";

import React from "react";

export default function Icon() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  
  const onUpdate = React.useCallback((matcher: MediaQueryList) => {
    setIsDarkMode(matcher.matches);
  }, []);

  React.useEffect(() => {
    // Set client flag first to prevent hydration mismatch
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      const matcher: MediaQueryList = window.matchMedia(
        "(prefers-color-scheme: dark)",
      );
      matcher.addEventListener("change", () => onUpdate(matcher));
      onUpdate(matcher);
    }
  }, [onUpdate]);

  // During SSR and initial hydration, always use the light icon to prevent mismatch
  const iconHref = isClient && isDarkMode ? "/logos/icon.ico" : "/logos/icon-black.ico";

  return (
    <link
      rel="icon"
      type="image/svg+xml"
      href={iconHref}
      id="light-scheme-icon"
    />
  );
}
