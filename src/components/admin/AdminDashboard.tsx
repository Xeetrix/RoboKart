"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatPrice } from "@/lib/format";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { Order } from "@/types/database";

type Counts = {
  products: number;
  categories: number;
  orders: number;
  pendingOrders: number;
};

const emptyCounts: Counts = { products: 0, categories: 0, orders: 0, pendingOrders: 0 };

export function AdminDashboard() {
  const supabase = useMemo(() => createAdminSupabaseClient(), []);
  const [counts, setCounts] = useState<Counts>(emptyCounts);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      setIsLoading(true);
      setError("");

      const [productsResult, categoriesResult, ordersResult, pendingResult, recentResult] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("categories").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase
          .from("orders")
          .select("id,customer_name,phone,delivery_address,payment_method,total_amount,status,created_at,notes")
          .order("created_at", { ascending: false })
          .limit(6)
      ]);

      const firstError = productsResult.error ?? categoriesResult.error ?? ordersResult.error ?? pendingResult.error ?? recentResult.error;
      if (firstError) {
        setError(firstError.message);
      } else {
        setCounts({
          products: productsResult.count ?? 0,
          categories: categoriesResult.count ?? 0,
          orders: ordersResult.count ?? 0,
          pendingOrders: pendingResult.count ?? 0
        });
        setRecentOrders((recentResult.data ?? []) as Order[]);
      }

      setIsLoading(false);
    }

    void loadDashboard();
  }, [supabase]);

  const cards = [
    { label: "Total products", value: counts.products, href: "/admin/products" },
    { label: "Total categories", value: counts.categories, href: "/admin/categories" },
    { label: "Total orders", value: counts.orders, href: "/admin/orders" },
    { label: "Pending orders", value: counts.pendingOrders, href: "/admin/orders" }
  ];

  return (
    <section>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-600">Overview</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Admin dashboard</h1>
        </div>
        <Link href="/" className="rounded-full bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm ring-1 ring-slate-200">View storefront</Link>
      </div>

      {error ? <p className="mt-6 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">{error}</p> : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm font-bold text-slate-500">{card.label}</p>
            <p className="mt-3 text-4xl font-black text-slate-950">{isLoading ? "—" : card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-black">Recent orders</h2>
          <Link href="/admin/orders" className="text-sm font-black text-sky-700">Manage orders</Link>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3">Customer</th>
                <th className="py-3">Phone</th>
                <th className="py-3">Status</th>
                <th className="py-3">Total</th>
                <th className="py-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="py-4 font-bold text-slate-950">{order.customer_name}</td>
                  <td className="py-4 text-slate-600">{order.phone}</td>
                  <td className="py-4"><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">{order.status}</span></td>
                  <td className="py-4 font-black">{formatPrice(Number(order.total_amount))}</td>
                  <td className="py-4 text-slate-500">{new Date(order.created_at).toLocaleString()}</td>
                </tr>
              ))}
              {!recentOrders.length ? (
                <tr><td colSpan={5} className="py-8 text-center text-slate-500">{isLoading ? "Loading orders..." : "No orders yet."}</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
