import { ProductGrid } from "@/components/ProductGrid";
import { getCategories, getProducts } from "@/lib/products";

type ProductsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const [{ category }, categories, products] = await Promise.all([searchParams, getCategories(), getProducts()]);

  return (
    <section className="mx-auto max-w-7xl section-spacing container-padding">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-deepBlue">Products</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">Shop robotics components</h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600">Filter by category, search by name, and build your cart with Robokart's MVP catalog.</p>
      </div>
      <ProductGrid products={products} categories={categories} initialCategory={category} />
    </section>
  );
}
