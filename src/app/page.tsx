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

      <section className="relative overflow-hidden bg-zinc-950 section-spacing text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.22),transparent_28rem),radial-gradient(circle_at_90%_80%,rgba(15,59,130,0.55),transparent_26rem)]" />
        <div className="relative mx-auto max-w-7xl container-padding">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-300">Featured products</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Popular picks for students</h2>
            </div>
            <Link href="/products" className="button-secondary border-white/20 bg-white/10 text-white hover:bg-white hover:text-ink">Explore catalog</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl section-spacing container-padding">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-deepBlue">Why Robokart</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">Premium support for practical builds</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["⚙", "Quality parts", "Carefully selected components for reliable student builds."],
            ["✦", "Manual mentoring", "Need help? Robokart guides projects through WhatsApp."],
            ["⌁", "Bangladesh focused", "Simple ordering, local support, and practical robotics bundles."]
          ].map(([icon, title, body]) => (
            <div key={title} className="premium-card p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ink to-deepBlue text-2xl text-white shadow-lg shadow-blue-950/20">{icon}</div>
              <h3 className="text-xl font-black text-ink">{title}</h3>
              <p className="mt-3 leading-7 text-zinc-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl pb-16 container-padding">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ink via-deepBlue to-sky-700 p-8 text-white shadow-2xl shadow-sky-950/20 sm:p-12 md:flex md:items-center md:justify-between md:gap-8">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-skyAccent/25 blur-3xl animate-pulse-glow" />
          <div className="relative">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-200">Project help</p>
            <h2 className="mt-3 text-3xl font-black">Need project mentoring?</h2>
            <p className="mt-3 max-w-2xl text-zinc-200">Message Robokart on WhatsApp for component selection and manual robotics project guidance.</p>
          </div>
          <a href={getWhatsAppLink("Hi Robokart, I need project mentoring.")} target="_blank" rel="noreferrer" className="button-secondary relative mt-6 border-white/20 bg-white text-ink md:mt-0">
            Start on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
