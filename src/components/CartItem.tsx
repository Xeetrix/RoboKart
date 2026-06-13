"use client";

import { ProductImage } from "@/components/ProductImage";
import { useCart, type CartLine } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export function CartItem({ item }: { item: CartLine }) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();
  const lineTotal = item.product.price * item.quantity;

  return (
    <div className="grid gap-4 rounded-[1.75rem] border border-zinc-200/80 bg-white p-4 shadow-sm shadow-slate-950/5 transition hover:border-sky-200 hover:shadow-soft sm:grid-cols-[116px_1fr]">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100">
        <ProductImage src={item.product.image_url} alt={item.product.name} />
      </div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-deepBlue">Cart item</p>
          <h3 className="mt-1 font-black leading-6 text-ink">{item.product.name}</h3>
          <p className="mt-1 text-sm font-semibold text-zinc-500">{formatPrice(item.product.price)} each</p>
          <button type="button" onClick={() => removeItem(item.product.id)} className="mt-3 text-sm font-black text-red-600 transition hover:text-red-700 hover:underline">Remove</button>
        </div>
        <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
          <div className="flex items-center rounded-full border border-zinc-200 bg-zinc-50 p-1 shadow-inner">
            <button type="button" aria-label="Decrease quantity" onClick={() => decreaseQuantity(item.product.id)} className="flex h-9 w-9 items-center justify-center rounded-full font-black transition hover:bg-white hover:shadow-sm">−</button>
            <span className="min-w-10 text-center text-sm font-black">{item.quantity}</span>
            <button type="button" aria-label="Increase quantity" onClick={() => increaseQuantity(item.product.id)} className="flex h-9 w-9 items-center justify-center rounded-full font-black transition hover:bg-white hover:shadow-sm">+</button>
          </div>
          <span className="text-lg font-black text-deepBlue">{formatPrice(lineTotal)}</span>
        </div>
      </div>
    </div>
  );
}
