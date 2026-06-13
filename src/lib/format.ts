export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0
  }).format(price);
}

export function getWhatsAppLink(message = "Hi Robokart, I need help with robotics components and mentoring.") {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "8801000000000";
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
