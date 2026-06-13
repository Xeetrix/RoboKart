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

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const isOutOfStock = product.stock_status === "out_of_stock";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-square overflow-hidden">
        <ProductImage src={product.image_url} alt={product.name} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-black leading-6 text-ink">{product.name}</h3>
          <span className="whitespace-nowrap text-sm font-black text-deepBlue">{formatPrice(product.price)}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
          {product.short_description ?? "Robokart quality component for student projects."}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs font-bold">
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-600">{product.categories?.name ?? "Robokart"}</span>
          <span className={isOutOfStock ? "text-red-600" : "text-emerald-600"}>{stockLabels[product.stock_status]}</span>
        </div>
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={() => {
            addItem(product);
            setAdded(true);
            window.setTimeout(() => setAdded(false), 1400);
          }}
          className="mt-5 rounded-full bg-ink px-4 py-3 text-sm font-black text-white transition hover:bg-deepBlue disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          {added ? "Added to cart" : isOutOfStock ? "Unavailable" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
