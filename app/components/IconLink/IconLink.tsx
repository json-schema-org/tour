"use client";

import React from "react";

export default function Icon() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const onUpdate = React.useCallback((matcher: MediaQueryList) => {
    setIsDarkMode(matcher.matches);
  }, []);

  React.useEffect(() => {
    const matcher: MediaQueryList = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );
    matcher.addEventListener("change", () => onUpdate(matcher));
    onUpdate(matcher);
  }, []);

  return (
    <link
      rel="icon"
      type="image/svg+xml"
      href={isDarkMode ? "/logos/icon.ico" : "/logos/icon-black.ico"}
      id="light-scheme-icon"
    />
  );
}
