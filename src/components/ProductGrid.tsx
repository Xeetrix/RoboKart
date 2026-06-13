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
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, search, selectedCategory]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-3xl border border-zinc-100 bg-white p-4 shadow-sm lg:grid-cols-[1fr_260px]">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search product by name..."
          className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-skyAccent focus:ring-4 focus:ring-sky-100"
        />
        <select
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm font-semibold outline-none transition focus:border-skyAccent focus:ring-4 focus:ring-sky-100"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>{category.name}</option>
          ))}
        </select>
      </div>

      {filteredProducts.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 p-10 text-center">
          <h3 className="text-xl font-black text-ink">No products found</h3>
          <p className="mt-2 text-zinc-500">Try another category or search term.</p>
        </div>
      )}
    </div>
  );
}
