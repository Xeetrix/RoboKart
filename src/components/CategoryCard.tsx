import Link from "next/link";
import type { Category } from "@/types/database";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft"
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-xl font-black text-deepBlue">
        {category.name.slice(0, 2).toUpperCase()}
      </div>
      <h3 className="text-lg font-black text-ink">{category.name}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-500">{category.description ?? "Explore reliable parts for your next build."}</p>
      <span className="mt-5 inline-block text-sm font-bold text-deepBlue group-hover:text-sky-500">Browse category →</span>
    </Link>
  );
}
