import { getWhatsAppLink } from "@/lib/format";

export function WhatsAppButton({ label = "WhatsApp" }: { label?: string }) {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-2xl shadow-emerald-950/25 transition hover:-translate-y-1 hover:scale-105 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2"
    >
      {label}
    </a>
  );
}
