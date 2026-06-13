"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Category, Product } from "@/types/database";

export function ProductGrid({ products, categories, initialCategory }: { products: Product[]; categories: Category[]; initialCategory?: string }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory ?? "all");
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.categories?.slug === selectedCategory;
      const normalizedSearch = search.toLowerCase().trim();
      const matchesSearch = !normalizedSearch || product.name.toLowerCase().includes(normalizedSearch) || product.short_description?.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  }, [products, search, selectedCategory]);

  return (
    <div className="space-y-8">
      <div className="glass-card grid gap-4 rounded-[2rem] p-4 lg:grid-cols-[1fr_280px]">
        <label className="relative block">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search components, kits, sensors..."
            className="field-control pl-10"
          />
        </label>
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="field-control font-black"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedCategory("all")}
          className={`rounded-full px-4 py-2 text-sm font-black transition ${selectedCategory === "all" ? "bg-ink text-white shadow-lg shadow-slate-950/20" : "border border-zinc-200 bg-white text-zinc-600 hover:border-sky-300 hover:text-deepBlue"}`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setSelectedCategory(category.slug)}
            className={`rounded-full px-4 py-2 text-sm font-black transition ${selectedCategory === category.slug ? "bg-deepBlue text-white shadow-lg shadow-blue-950/20" : "border border-zinc-200 bg-white text-zinc-600 hover:border-sky-300 hover:text-deepBlue"}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {filteredProducts.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-[2rem] border border-dashed border-sky-200 bg-sky-50/70 p-10 text-center shadow-inner">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-2xl font-black text-deepBlue shadow-sm">RK</div>
          <h3 className="text-2xl font-black text-ink">No products found</h3>
          <p className="mx-auto mt-2 max-w-md text-zinc-600">Try another category, simplify your search, or message Robokart for manual component sourcing.</p>
        </div>
      )}
    </div>
  );
}
