import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-courier-prime", // Create a CSS variable for the font
  weight: ["400", "700"], // Adjust weights if needed
  style: ["normal", "italic"], // Include italic style
});

export const metadata: Metadata = {
  title: "Salim Lounis",
  description: "Salim Lounis Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={courierPrime.variable}>{children}</body>
    </html>
  );
}
