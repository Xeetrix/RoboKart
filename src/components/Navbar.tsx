"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { RKLogo } from "@/components/RKLogo";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/75 shadow-sm shadow-slate-950/5 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl container-padding py-3">
        <div className="flex items-center justify-between gap-3">
          <RKLogo />
          <div className="hidden items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 p-1 shadow-sm md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm font-bold text-zinc-600 transition hover:bg-sky-50 hover:text-deepBlue">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative inline-flex items-center justify-center rounded-full border border-zinc-200 bg-ink px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-deepBlue focus:outline-none focus:ring-2 focus:ring-skyAccent focus:ring-offset-2">
              Cart
              <span className="ml-2 min-w-6 rounded-full bg-skyAccent px-2 py-0.5 text-center text-xs font-black text-ink shadow-[0_0_18px_rgba(56,189,248,.45)]">{totalItems}</span>
            </Link>
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-ink shadow-sm transition hover:border-sky-300 md:hidden"
            >
              <span className="sr-only">Menu</span>
              <span className="space-y-1.5">
                <span className={`block h-0.5 w-5 rounded-full bg-current transition ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-5 rounded-full bg-current transition ${isOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 rounded-full bg-current transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
        {isOpen ? (
          <div className="mt-3 grid gap-2 rounded-3xl border border-zinc-200 bg-white/95 p-3 shadow-soft md:hidden">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-black text-zinc-700 transition hover:bg-sky-50 hover:text-deepBlue">
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
