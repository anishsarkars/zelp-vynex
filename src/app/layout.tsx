import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Zelp — Liquid yield and private markets",
  description: "YieldShares turn a liquidity position into a plain ERC-20 you can trade, lend or post as collateral. Private routing for crypto and tokenized stocks on Robinhood Chain.",
  openGraph: {
    title: "Zelp — Liquid yield and private markets",
    description: "LP positions as tradeable ERC-20 YieldShares, plus private execution for crypto and tokenized stocks.",
    type: "website",
    url: "https://www.usezelp.org/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Load Fraunces directly via Google Fonts link — avoids next/font axis bug */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..600&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
