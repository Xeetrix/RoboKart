import { getWhatsAppLink } from "@/lib/format";

export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+880 1000-000000";
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "#";

  return (
    <section className="relative mx-auto max-w-5xl section-spacing container-padding">
      <div className="absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-skyAccent/10 blur-3xl" />
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-deepBlue">Contact</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">Talk to Robokart</h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600">Need parts, project packages, or mentoring? Contact Robokart directly for manual support.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="premium-card bg-emerald-50 p-8 hover:border-emerald-200">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-xl font-black text-white shadow-lg shadow-emerald-500/20">WA</div>
          <h2 className="text-2xl font-black text-ink">WhatsApp</h2>
          <p className="mt-3 leading-7 text-zinc-600">Fastest way to order, ask stock questions, or request project mentoring.</p>
          <span className="mt-6 inline-flex rounded-full bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition group-hover:scale-105">Open WhatsApp</span>
        </a>
        <div className="premium-card p-8">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ink to-deepBlue text-xl font-black text-white">☎</div>
          <h2 className="text-2xl font-black text-ink">Phone</h2>
          <p className="mt-3 text-zinc-600">{phone}</p>
          <a href={facebookUrl} className="button-secondary mt-6">Facebook page</a>
        </div>
      </div>
      <div className="relative mt-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-ink via-deepBlue to-sky-700 p-8 text-white shadow-2xl shadow-sky-950/20">
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-skyAccent/25 blur-3xl" />
        <h2 className="relative text-2xl font-black">Need Mentoring?</h2>
        <p className="relative mt-3 max-w-2xl text-zinc-200">Share your idea, deadline, and current parts list. Robokart will guide you through WhatsApp.</p>
        <a href={getWhatsAppLink("Hi Robokart, I need mentoring for my project.")} target="_blank" rel="noreferrer" className="button-secondary relative mt-6 bg-white text-ink">
          Need Mentoring
        </a>
      </div>
    </section>
  );
}
