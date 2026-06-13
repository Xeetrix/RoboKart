import Link from "next/link";

export function RKLogo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const isDark = tone === "dark";

  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Robokart home">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-ink via-deepBlue to-sky-700 text-base font-black tracking-tight text-white shadow-lg shadow-sky-950/20 transition group-hover:scale-105">
        RK
      </span>
      <span className="hidden flex-col leading-none sm:flex">
        <span className={`text-base font-black tracking-tight ${isDark ? "text-white" : "text-ink"}`}>Robokart</span>
        <span className={`text-xs font-semibold ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>Shaping Innovation</span>
      </span>
    </Link>
  );
}
