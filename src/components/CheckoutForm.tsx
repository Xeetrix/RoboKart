"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { supabase } from "@/lib/supabase";
import type { OrderInput, OrderItemInput } from "@/types/database";

type FormState = {
  customer_name: string;
  phone: string;
  delivery_address: string;
  payment_method: "COD" | "bKash";
  notes: string;
};

const paymentOptions: Array<{ value: FormState["payment_method"]; title: string; description: string }> = [
  { value: "COD", title: "Cash on Delivery", description: "Pay after manual confirmation and delivery setup." },
  { value: "bKash", title: "bKash", description: "Robokart will share payment instructions manually." }
];

export function CheckoutForm() {
  const { items, totalAmount, clearCart } = useCart();
  const [form, setForm] = useState<FormState>({
    customer_name: "",
    phone: "",
    delivery_address: "",
    payment_method: "COD",
    notes: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.customer_name.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!form.phone.trim()) {
      setError("Phone number is required.");
      return;
    }

    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);

    const orderId = crypto.randomUUID();

    const orderPayload: OrderInput = {
      id: orderId,
      customer_name: form.customer_name.trim(),
      phone: form.phone.trim(),
      delivery_address: form.delivery_address.trim() || null,
      payment_method: form.payment_method,
      notes: form.notes.trim() || null,
      total_amount: totalAmount,
      status: "pending"
    };

    const { error: orderError } = await supabase.from("orders").insert(orderPayload);

    if (orderError) {
      setError(orderError.message ?? "Unable to create order. Please contact Robokart on WhatsApp.");
      setIsSubmitting(false);
      return;
    }

    const orderItems: OrderItemInput[] = items.map((item) => ({
      order_id: orderId,
      product_id: item.product.id,
      product_name: item.product.name,
      quantity: item.quantity,
      unit_price: item.product.price,
      line_total: item.product.price * item.quantity
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

    if (itemsError) {
      setError(itemsError.message);
      setIsSubmitting(false);
      return;
    }

    clearCart();
    setIsComplete(true);
    setIsSubmitting(false);
  }

  if (isComplete) {
    return (
      <div className="relative overflow-hidden rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8 text-center shadow-soft">
        <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500 text-2xl font-black text-white">✓</div>
        <h2 className="relative text-2xl font-black text-ink">Order received</h2>
        <p className="relative mx-auto mt-3 max-w-lg text-zinc-700">Thank you! Robokart team will contact you shortly to confirm stock, delivery, and payment details.</p>
        <Link href="/products" className="button-primary relative mt-6">Continue shopping</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="rounded-[2rem] border border-zinc-200/80 bg-white p-5 shadow-sm shadow-slate-950/5 sm:p-7">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-deepBlue">Details</p>
        <h2 className="mt-2 text-2xl font-black text-ink">Checkout details</h2>
        <div className="mt-6 grid gap-5">
          <label className="grid gap-2 text-sm font-black text-zinc-700">
            Full name <span className="sr-only">required</span>
            <input required value={form.customer_name} onChange={(event) => setForm({ ...form, customer_name: event.target.value })} className="field-control font-normal" placeholder="Your name" />
          </label>
          <label className="grid gap-2 text-sm font-black text-zinc-700">
            Phone number <span className="sr-only">required</span>
            <input required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="field-control font-normal" placeholder="01XXXXXXXXX" />
          </label>
          <label className="grid gap-2 text-sm font-black text-zinc-700">
            Delivery address <span className="font-normal text-zinc-400">optional</span>
            <textarea value={form.delivery_address} onChange={(event) => setForm({ ...form, delivery_address: event.target.value })} rows={3} className="field-control font-normal" placeholder="Area, city, delivery notes" />
          </label>
          <fieldset className="grid gap-3">
            <legend className="text-sm font-black text-zinc-700">Payment method</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {paymentOptions.map((option) => (
                <label key={option.value} className={`cursor-pointer rounded-3xl border p-4 transition ${form.payment_method === option.value ? "border-skyAccent bg-sky-50 shadow-lg shadow-sky-500/10" : "border-zinc-200 bg-white hover:border-sky-200"}`}>
                  <input
                    type="radio"
                    name="payment_method"
                    value={option.value}
                    checked={form.payment_method === option.value}
                    onChange={() => setForm({ ...form, payment_method: option.value })}
                    className="sr-only"
                  />
                  <span className="text-sm font-black text-ink">{option.title}</span>
                  <span className="mt-2 block text-xs leading-5 text-zinc-500">{option.description}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="grid gap-2 text-sm font-black text-zinc-700">
            Notes <span className="font-normal text-zinc-400">optional</span>
            <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} rows={3} className="field-control font-normal" placeholder="Project name, deadline, special requests" />
          </label>
        </div>
      </div>
      <aside className="h-fit rounded-[2rem] border border-zinc-200/80 bg-white/90 p-6 shadow-soft backdrop-blur lg:sticky lg:top-28">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-deepBlue">Summary</p>
        <h3 className="mt-2 text-xl font-black text-ink">Order summary</h3>
        <div className="mt-5 max-h-72 space-y-3 overflow-auto pr-1">
          {items.length ? items.map((item) => (
            <div key={item.product.id} className="flex justify-between gap-4 rounded-2xl bg-zinc-50 p-3 text-sm">
              <span className="text-zinc-600">{item.product.name} × {item.quantity}</span>
              <span className="font-black text-ink">{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          )) : <p className="rounded-2xl bg-zinc-50 p-3 text-sm text-zinc-500">Your cart is empty.</p>}
        </div>
        <div className="mt-6 flex justify-between border-t border-zinc-200 pt-5 text-lg font-black">
          <span>Total</span>
          <span>{formatPrice(totalAmount)}</span>
        </div>
        {error ? <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}
        <button type="submit" disabled={isSubmitting || !items.length} className="button-primary mt-6 w-full px-5 py-3">
          {isSubmitting ? "Submitting..." : "Submit order"}
        </button>
      </aside>
    </form>
  );
}
