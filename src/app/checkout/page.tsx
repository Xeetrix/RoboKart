import { CheckoutForm } from "@/components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <section className="mx-auto max-w-6xl section-spacing container-padding">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-deepBlue">Checkout</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">Confirm your Robokart order</h1>
        <p className="mt-4 text-lg leading-8 text-zinc-600">Submit your details and the Robokart team will manually confirm stock, delivery, and payment.</p>
      </div>
      <CheckoutForm />
    </section>
  );
}
