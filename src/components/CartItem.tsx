"use client";

import { ProductImage } from "@/components/ProductImage";
import { useCart, type CartLine } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export function CartItem({ item }: { item: CartLine }) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();
  const lineTotal = item.product.price * item.quantity;

  return (
    <div className="grid gap-4 rounded-3xl border border-zinc-100 bg-white p-4 shadow-sm sm:grid-cols-[112px_1fr]">
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <ProductImage src={item.product.image_url} alt={item.product.name} />
      </div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-black text-ink">{item.product.name}</h3>
          <p className="mt-1 text-sm text-zinc-500">{formatPrice(item.product.price)} each</p>
          <button type="button" onClick={() => removeItem(item.product.id)} className="mt-3 text-sm font-bold text-red-600">Remove</button>
        </div>
        <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
          <div className="flex items-center rounded-full border border-zinc-200 bg-white">
            <button type="button" onClick={() => decreaseQuantity(item.product.id)} className="px-4 py-2 font-black">−</button>
            <span className="min-w-10 text-center text-sm font-black">{item.quantity}</span>
            <button type="button" onClick={() => increaseQuantity(item.product.id)} className="px-4 py-2 font-black">+</button>
          </div>
          <span className="font-black text-deepBlue">{formatPrice(lineTotal)}</span>
        </div>
      </div>
    </div>
  );
}
