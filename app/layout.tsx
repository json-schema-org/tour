import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
// import { Providers } from "./providers";
import "./styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { Providers } from "./providers";

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
