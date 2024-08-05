import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
// import { Providers } from "./providers";
import "./styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Tour Of Json Schema",
  description: "A Tour of Json Schema",
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/logos/icon.ico",
      media: "(prefers-color-scheme: dark)",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/logos/icon-black.ico",
      media: "(prefers-color-scheme: light)",
    },
  ],
  metadataBase: new URL("https://tour.json-schema.org"),
  openGraph: {
    title: "A Tour of JSON Schema",
    description: "A Tour of JSON Schema, Learn JSON Schema by Example",
    images: {
      url: "/icons/icon.ico", // Must be an absolute URL
      width: 91,
      height: 90,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="45PV3wwrdtxUK6KI1fti1HoYTYSDEbSthaMIXKdG1s8"
        />
      </head>
      <body className={GeistSans.className}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
