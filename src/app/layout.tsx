import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";


export const metadata: Metadata = {
  title: "Robokart | Shaping Innovation",
  description:
    "Robokart is a Bangladesh-based robotics and electronics component platform with manual project mentoring through WhatsApp."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans antialiased">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
