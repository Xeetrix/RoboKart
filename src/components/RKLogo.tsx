import Link from "next/link";

export function RKLogo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Robokart home">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-base font-black tracking-tight text-white shadow-soft">
        RK
      </span>
      <span className="hidden flex-col leading-none sm:flex">
        <span className="text-base font-black tracking-tight text-ink">Robokart</span>
        <span className="text-xs font-medium text-zinc-500">Shaping Innovation</span>
      </span>
    </Link>
  );
}
