import Link from "next/link";
import { getWhatsAppLink } from "@/lib/format";

const floatingParts = [
  { label: "MCU", className: "left-4 top-8 animate-float-slow" },
  { label: "5V", className: "right-6 top-14 animate-float-reverse" },
  { label: "AI", className: "bottom-12 left-8 animate-float-reverse" },
  { label: "IoT", className: "bottom-8 right-10 animate-float-slow" }
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.28),transparent_28rem),radial-gradient(circle_at_82%_12%,rgba(15,59,130,0.65),transparent_24rem),linear-gradient(135deg,#020617_0%,#09090b_48%,#0f172a_100%)]" />
      <div className="absolute left-1/2 top-16 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-skyAccent/20 blur-3xl animate-pulse-glow" />
      <div className="absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 container-padding py-16 sm:py-24 lg:min-h-[720px] lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div className="animate-slide-up space-y-8 text-center lg:text-left">
          <div className="inline-flex rounded-full border border-sky-300/25 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-sky-100 shadow-lg shadow-sky-950/20 backdrop-blur">
            Robokart • Shaping Innovation
          </div>
          <div className="space-y-5">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-sky-300">Robotics parts + project mentoring</p>
            <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Build Smarter. <span className="bg-gradient-to-r from-sky-200 via-skyAccent to-blue-400 bg-clip-text text-transparent">Create Faster.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl font-semibold text-sky-50/90 sm:text-2xl lg:mx-0">Powering every bot with precision.</p>
            <p className="mx-auto max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg lg:mx-0">
              Shop microcontrollers, sensors, motor drivers, robot kits, and project packages built for Bangladesh&apos;s student robotics community.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link href="/products" className="button-primary shadow-sky-500/25">Shop Components</Link>
            <a href={getWhatsAppLink("Hi Robokart, I need mentoring for my robotics project.")} target="_blank" rel="noreferrer" className="button-secondary border-white/20 bg-white/10 text-white hover:bg-white hover:text-ink">
              Need Project Help?
            </a>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-2 text-left">
            {[
              ["Fast", "component picks"],
              ["Manual", "order support"],
              ["Student", "friendly kits"]
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                <p className="text-lg font-black text-white">{title}</p>
                <p className="mt-1 text-xs leading-5 text-zinc-400">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg animate-slide-up [animation-delay:120ms]">
          <div className="absolute -inset-6 rounded-[3rem] bg-skyAccent/20 blur-3xl animate-pulse-glow" />
          {floatingParts.map((part) => (
            <div key={part.label} className={`absolute z-20 hidden h-16 w-16 items-center justify-center rounded-2xl border border-sky-200/25 bg-white/10 text-sm font-black text-sky-100 shadow-2xl backdrop-blur sm:flex ${part.className}`}>
              {part.label}
            </div>
          ))}
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-sky-950/40 backdrop-blur-xl">
            <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-zinc-950 via-slate-900 to-blue-950 p-6 text-white">
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-3xl font-black text-ink shadow-xl shadow-sky-500/20">RK</div>
                <div className="rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-sky-200">Live MVP</div>
              </div>
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-300">Build dashboard</span>
                  <span className="h-3 w-3 rounded-full bg-skyAccent shadow-[0_0_24px_rgba(56,189,248,.9)]" />
                </div>
                <div className="space-y-4">
                  {["Microcontrollers", "Sensors", "Robotics Kits"].map((item, index) => (
                    <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 transition hover:bg-white/10">
                      <span className="font-semibold">{item}</span>
                      <span className="rounded-full bg-sky-300/15 px-3 py-1 text-xs font-black text-sky-200">0{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-4 text-ink">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500">Mentoring</p>
                  <p className="mt-2 text-2xl font-black">1:1</p>
                </div>
                <div className="rounded-2xl border border-sky-200/20 bg-sky-400/10 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-sky-200">Support</p>
                  <p className="mt-2 text-2xl font-black">WA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
