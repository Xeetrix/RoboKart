import Link from "next/link";
import { getWhatsAppLink } from "@/lib/format";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,#e0f2fe,transparent_35%),linear-gradient(180deg,#ffffff,#f8fafc)]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 container-padding py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-deepBlue shadow-sm">
            Shaping Innovation
          </div>
          <div className="space-y-5">
            <h1 className="text-5xl font-black tracking-tight text-ink sm:text-6xl lg:text-7xl">Robokart</h1>
            <p className="max-w-2xl text-xl font-semibold text-zinc-700 sm:text-2xl">Powering every bot with precision.</p>
            <p className="max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg">
              Shop microcontrollers, sensors, motor drivers, robot kits, and project packages built for Bangladesh&apos;s student robotics community.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className="button-primary">Shop Now</Link>
            <a href={getWhatsAppLink("Hi Robokart, I need mentoring for my robotics project.")} target="_blank" rel="noreferrer" className="button-secondary">
              Need Mentoring?
            </a>
          </div>
        </div>
        <div className="rounded-[2rem] border border-zinc-100 bg-white p-5 shadow-soft">
          <div className="rounded-[1.5rem] bg-ink p-8 text-white">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white text-4xl font-black text-ink">RK</div>
            <div className="mt-10 grid gap-4">
              {['Microcontrollers', 'Sensors', 'Robotics Kits'].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  <span className="font-semibold">{item}</span>
                  <span className="h-3 w-3 rounded-full bg-skyAccent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
