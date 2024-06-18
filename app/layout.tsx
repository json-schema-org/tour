import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
// import { Providers } from "./providers";
import "./styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { Providers } from "./providers";
const font = Open_Sans({ subsets: ["latin"] });
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "./styles/theme";

export const metadata: Metadata = {
  title: "Tour Of Json Schema",
  description: "A Tour of Json Schema",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Providers>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
