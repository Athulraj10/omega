import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/layout";

export const metadata: Metadata = {
  title: "Omega Fresh Fish - Premium Quality Seafood",
  description: "Experience the finest selection of premium, sustainably-sourced fish delivered fresh to your doorstep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
