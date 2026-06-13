"use client";

import Link from "next/link";
import { CartItem } from "@/components/CartItem";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, totalAmount } = useCart();

  return (
    <section className="relative mx-auto max-w-6xl section-spacing container-padding">
      <div className="absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-skyAccent/10 blur-3xl" />
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-deepBlue">Cart</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">Your build cart</h1>
      </div>
      {items.length ? (
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">{items.map((item) => <CartItem key={item.product.id} item={item} />)}</div>
          <aside className="h-fit rounded-[1.75rem] border border-zinc-200/80 bg-white/85 p-6 shadow-soft backdrop-blur lg:sticky lg:top-28">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-deepBlue">Summary</p>
            <h2 className="mt-2 text-2xl font-black text-ink">Cart total</h2>
            <div className="mt-6 space-y-3 text-sm text-zinc-600">
              <div className="flex justify-between"><span>Items</span><span className="font-black text-ink">{items.length}</span></div>
              <div className="flex justify-between"><span>Confirmation</span><span className="font-black text-ink">Manual</span></div>
            </div>
            <div className="mt-5 flex justify-between border-t border-zinc-200 pt-5 text-lg font-black">
              <span>Total amount</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
            <Link href="/checkout" className="button-primary mt-6 w-full">Proceed to checkout</Link>
            <Link href="/products" className="button-secondary mt-3 w-full">Continue shopping</Link>
          </aside>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-[2rem] border border-dashed border-sky-200 bg-sky-50/70 p-10 text-center shadow-inner">
          <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-skyAccent/20 blur-3xl" />
          <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-ink text-2xl font-black text-white shadow-xl shadow-sky-950/20">RK</div>
          <h2 className="relative text-2xl font-black text-ink">Your cart is empty</h2>
          <p className="relative mx-auto mt-2 max-w-md text-zinc-600">Add components, kits, or project packages to continue building your smarter robot.</p>
          <Link href="/products" className="button-primary relative mt-6">Shop products</Link>
        </div>
      )}
    </section>
  );
}
