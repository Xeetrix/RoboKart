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
      <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8 text-center">
        <h2 className="text-2xl font-black text-ink">Order received</h2>
        <p className="mt-3 text-zinc-700">Thank you! Robokart team will contact you shortly to confirm your order.</p>
        <Link href="/products" className="button-primary mt-6">Continue shopping</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-ink">Checkout details</h2>
        <div className="mt-6 grid gap-5">
          <label className="grid gap-2 text-sm font-bold text-zinc-700">
            Full name <span className="sr-only">required</span>
            <input required value={form.customer_name} onChange={(event) => setForm({ ...form, customer_name: event.target.value })} className="rounded-2xl border border-zinc-200 px-4 py-3 font-normal outline-none focus:border-skyAccent focus:ring-4 focus:ring-sky-100" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-zinc-700">
            Phone number <span className="sr-only">required</span>
            <input required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="rounded-2xl border border-zinc-200 px-4 py-3 font-normal outline-none focus:border-skyAccent focus:ring-4 focus:ring-sky-100" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-zinc-700">
            Delivery address <span className="font-normal text-zinc-400">optional</span>
            <textarea value={form.delivery_address} onChange={(event) => setForm({ ...form, delivery_address: event.target.value })} rows={3} className="rounded-2xl border border-zinc-200 px-4 py-3 font-normal outline-none focus:border-skyAccent focus:ring-4 focus:ring-sky-100" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-zinc-700">
            Payment method
            <select value={form.payment_method} onChange={(event) => setForm({ ...form, payment_method: event.target.value as FormState["payment_method"] })} className="rounded-2xl border border-zinc-200 px-4 py-3 font-normal outline-none focus:border-skyAccent focus:ring-4 focus:ring-sky-100">
              <option value="COD">Cash on Delivery</option>
              <option value="bKash">bKash manual confirmation</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-zinc-700">
            Notes <span className="font-normal text-zinc-400">optional</span>
            <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} rows={3} className="rounded-2xl border border-zinc-200 px-4 py-3 font-normal outline-none focus:border-skyAccent focus:ring-4 focus:ring-sky-100" />
          </label>
        </div>
      </div>
      <aside className="h-fit rounded-3xl border border-zinc-100 bg-zinc-50 p-6">
        <h3 className="text-lg font-black text-ink">Order summary</h3>
        <div className="mt-5 space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between gap-4 text-sm">
              <span className="text-zinc-600">{item.product.name} × {item.quantity}</span>
              <span className="font-bold text-ink">{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between border-t border-zinc-200 pt-5 text-lg font-black">
          <span>Total</span>
          <span>{formatPrice(totalAmount)}</span>
        </div>
        {error ? <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}
        <button type="submit" disabled={isSubmitting || !items.length} className="mt-6 w-full rounded-full bg-ink px-5 py-3 text-sm font-black text-white transition hover:bg-deepBlue disabled:cursor-not-allowed disabled:bg-zinc-300">
          {isSubmitting ? "Submitting..." : "Submit order"}
        </button>
      </aside>
    </form>
  );
}
