"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { RKLogo } from "@/components/RKLogo";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between container-padding py-4">
        <RKLogo />
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-semibold text-zinc-600 transition hover:text-ink">
              {link.label}
            </Link>
          ))}
        </div>
        <Link href="/cart" className="button-secondary relative px-4 py-2">
          Cart
          <span className="ml-2 rounded-full bg-skyAccent px-2 py-0.5 text-xs font-black text-ink">{totalItems}</span>
        </Link>
      </nav>
    </header>
  );
}
