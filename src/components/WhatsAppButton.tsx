import { getWhatsAppLink } from "@/lib/format";

export function WhatsAppButton({ label = "WhatsApp" }: { label?: string }) {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-2xl transition hover:-translate-y-1 hover:bg-emerald-600"
    >
      {label}
    </a>
  );
}
