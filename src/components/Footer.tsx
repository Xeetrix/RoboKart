import Link from "next/link";
import { RKLogo } from "@/components/RKLogo";

export function Footer() {
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+880 1000-000000";
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "#";

  return (
    <footer className="border-t border-zinc-100 bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 container-padding py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <RKLogo />
          <p className="max-w-md text-sm leading-6 text-zinc-300">
            Bangladesh-based robotics and electronics components with manual project mentoring for students, makers, and early builders.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-sky-300">Shop</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-300">
            <Link href="/products">Products</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-sky-300">Contact</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-300">
            <span>{phone}</span>
            <a href={facebookUrl}>Facebook page</a>
            <Link href="/contact">Need mentoring?</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Robokart. Powering every bot with precision.
      </div>
    </footer>
  );
}
