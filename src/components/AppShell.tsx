"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <CartProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </CartProvider>
  );
}
