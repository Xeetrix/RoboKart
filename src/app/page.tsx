import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { getWhatsAppLink } from "@/lib/format";
import { getCategories, getProducts } from "@/lib/products";

export default async function HomePage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const featuredProducts = products.filter((product) => product.is_featured).slice(0, 4);

  return (
    <>
      <Hero />
      <section className="mx-auto max-w-7xl section-spacing container-padding">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-deepBlue">Featured categories</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">Everything for your bot</h2>
          </div>
          <Link href="/products" className="button-secondary">View all products</Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 4).map((category) => <CategoryCard key={category.id} category={category} />)}
        </div>
      </section>
      <section className="bg-zinc-50 section-spacing">
        <div className="mx-auto max-w-7xl container-padding">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-deepBlue">Featured products</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">Popular picks for students</h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl section-spacing container-padding">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Quality parts", "Carefully selected components for reliable student builds."],
            ["Manual mentoring", "Need help? Robokart guides projects through WhatsApp."],
            ["Bangladesh focused", "Simple ordering, local support, and practical robotics bundles."]
          ].map(([title, body]) => (
            <div key={title} className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-black text-ink">{title}</h3>
              <p className="mt-3 leading-7 text-zinc-600">{body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl pb-16 container-padding">
        <div className="rounded-[2rem] bg-ink p-8 text-white sm:p-12 md:flex md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-black">Need project mentoring?</h2>
            <p className="mt-3 max-w-2xl text-zinc-300">Message Robokart on WhatsApp for component selection and manual robotics project guidance.</p>
          </div>
          <a href={getWhatsAppLink("Hi Robokart, I need project mentoring.")} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full bg-skyAccent px-6 py-3 text-sm font-black text-ink md:mt-0">
            Start on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
