import { CheckoutForm } from "@/components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <section className="relative mx-auto max-w-6xl section-spacing container-padding">
      <div className="absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-skyAccent/10 blur-3xl" />
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-deepBlue">Checkout</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">Confirm your Robokart order</h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600">Submit your details and the Robokart team will manually confirm stock, delivery, and payment.</p>
      </div>
      <CheckoutForm />
    </section>
  );
}
