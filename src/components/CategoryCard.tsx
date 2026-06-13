import Link from "next/link";
import type { Category } from "@/types/database";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group premium-card relative overflow-hidden p-6"
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-skyAccent/10 blur-2xl transition group-hover:bg-skyAccent/25" />
      <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 text-xl font-black text-deepBlue shadow-inner">
        {category.name.slice(0, 2).toUpperCase()}
      </div>
      <h3 className="relative text-lg font-black text-ink">{category.name}</h3>
      <p className="relative mt-2 text-sm leading-6 text-zinc-500">{category.description ?? "Explore reliable parts for your next build."}</p>
      <span className="relative mt-5 inline-flex items-center text-sm font-black text-deepBlue transition group-hover:translate-x-1 group-hover:text-sky-500">Browse category →</span>
    </Link>
  );
}
