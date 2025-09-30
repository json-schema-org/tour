import type { Metadata } from "next";

import "./styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { Providers } from "./providers";
import { GoogleAnalytics } from "@next/third-parties/google";
import IconLink from "./components/IconLink";

export const metadata: Metadata = {
  title: "Tour Of Json Schema",
  description: "A Tour of Json Schema",

  metadataBase: new URL("https://tour.json-schema.org"),
  openGraph: {
    title: "A Tour of JSON Schema",
    description: "A Tour of JSON Schema, Learn JSON Schema by Examples",
    images: {
      url: "/logos/metaicon.png", // Must be an absolute URL
      width: 91,
      height: 90,
    },
    url: "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics gaId="G-X3SVRNR6WN" />
      <head>
        <IconLink />
      </head>
      <body suppressHydrationWarning>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Providers>
          <main className={GeistSans.className}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
