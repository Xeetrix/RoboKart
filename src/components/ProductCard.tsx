"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ProductImage";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/database";

const stockLabels = {
  in_stock: "In stock",
  low_stock: "Low stock",
  out_of_stock: "Out of stock"
};

const stockClasses = {
  in_stock: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  low_stock: "bg-amber-50 text-amber-700 ring-amber-200",
  out_of_stock: "bg-red-50 text-red-700 ring-red-200"
};

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const isOutOfStock = product.stock_status === "out_of_stock";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-zinc-200/80 bg-white shadow-sm shadow-slate-950/5 transition duration-300 hover:-translate-y-1.5 hover:border-sky-200 hover:shadow-[0_24px_70px_rgba(14,165,233,0.16)]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-skyAccent/0 blur-2xl transition group-hover:bg-skyAccent/25" />
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <ProductImage src={product.image_url} alt={product.name} />
        <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/85 px-3 py-1 text-xs font-black text-deepBlue shadow-sm backdrop-blur">
          {product.categories?.name ?? "Robokart"}
        </div>
        <div className={`absolute bottom-4 right-4 rounded-full px-3 py-1 text-xs font-black ring-1 ${stockClasses[product.stock_status]}`}>
          {stockLabels[product.stock_status]}
        </div>
      </div>
      <div className="relative flex flex-1 flex-col p-5">
        <h3 className="text-base font-black leading-6 text-ink transition group-hover:text-deepBlue">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
          {product.short_description ?? "Robokart quality component for student projects."}
        </p>
        <div className="mt-auto pt-5">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-400">Price</p>
              <p className="mt-1 text-2xl font-black tracking-tight text-ink">{formatPrice(product.price)}</p>
            </div>
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-deepBlue">MVP Pick</span>
          </div>
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={() => {
              addItem(product);
              setAdded(true);
              window.setTimeout(() => setAdded(false), 1400);
            }}
            className="button-primary w-full px-4 py-3"
          >
            {added ? "Added ✓" : isOutOfStock ? "Unavailable" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
