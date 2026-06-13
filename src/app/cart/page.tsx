"use client";

import Link from "next/link";
import { CartItem } from "@/components/CartItem";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, totalAmount } = useCart();

  return (
    <section className="mx-auto max-w-5xl section-spacing container-padding">
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-deepBlue">Cart</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">Your build cart</h1>
      </div>
      {items.length ? (
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">{items.map((item) => <CartItem key={item.product.id} item={item} />)}</div>
          <aside className="h-fit rounded-3xl border border-zinc-100 bg-zinc-50 p-6">
            <h2 className="text-xl font-black text-ink">Cart total</h2>
            <div className="mt-5 flex justify-between text-lg font-black">
              <span>Total amount</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
            <Link href="/checkout" className="button-primary mt-6 w-full">Proceed to checkout</Link>
            <Link href="/products" className="button-secondary mt-3 w-full">Continue shopping</Link>
          </aside>
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 p-10 text-center">
          <h2 className="text-2xl font-black text-ink">Your cart is empty</h2>
          <p className="mt-2 text-zinc-500">Add components, kits, or project packages to continue.</p>
          <Link href="/products" className="button-primary mt-6">Shop products</Link>
        </div>
      )}
    </section>
  );
}
