import { getWhatsAppLink } from "@/lib/format";

export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+880 1000-000000";
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "#";

  return (
    <section className="mx-auto max-w-5xl section-spacing container-padding">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-deepBlue">Contact</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">Talk to Robokart</h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600">Need parts, project packages, or mentoring? Contact Robokart directly for manual support.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8 transition hover:-translate-y-1 hover:shadow-soft">
          <h2 className="text-2xl font-black text-ink">WhatsApp</h2>
          <p className="mt-3 leading-7 text-zinc-600">Fastest way to order, ask stock questions, or request project mentoring.</p>
          <span className="mt-6 inline-block rounded-full bg-emerald-500 px-5 py-3 text-sm font-black text-white">Open WhatsApp</span>
        </a>
        <div className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-ink">Phone</h2>
          <p className="mt-3 text-zinc-600">{phone}</p>
          <a href={facebookUrl} className="mt-6 inline-block rounded-full border border-zinc-200 px-5 py-3 text-sm font-black text-ink">Facebook page</a>
        </div>
      </div>
      <div className="mt-6 rounded-3xl bg-ink p-8 text-white">
        <h2 className="text-2xl font-black">Need Mentoring?</h2>
        <p className="mt-3 max-w-2xl text-zinc-300">Share your idea, deadline, and current parts list. Robokart will guide you through WhatsApp.</p>
        <a href={getWhatsAppLink("Hi Robokart, I need mentoring for my project.")} target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-skyAccent px-5 py-3 text-sm font-black text-ink">
          Need Mentoring
        </a>
      </div>
    </section>
  );
}
