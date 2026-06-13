"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { formatPrice } from "@/lib/format";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { OrderStatus, OrderWithItems } from "@/types/database";

const statusOptions: OrderStatus[] = ["pending", "confirmed", "cancelled", "completed"];

export function AdminOrders() {
  const supabase = useMemo(() => createAdminSupabaseClient(), []);
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadOrders = useCallback(async function loadOrders() {
    setIsLoading(true);
    setError("");
    const { data, error: loadError } = await supabase
      .from("orders")
      .select("id,customer_name,phone,delivery_address,payment_method,notes,total_amount,status,created_at,order_items(id,order_id,product_id,product_name,quantity,unit_price,line_total,created_at)")
      .order("created_at", { ascending: false });

    if (loadError) {
      setError(loadError.message);
    } else {
      const nextOrders = (data ?? []) as OrderWithItems[];
      setOrders(nextOrders);
      setSelectedOrderId((current) => current ?? nextOrders[0]?.id ?? null);
    }
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  async function updateStatus(orderId: string, status: OrderStatus) {
    setUpdatingId(orderId);
    setError("");
    const { error: updateError } = await supabase.from("orders").update({ status }).eq("id", orderId);
    if (updateError) {
      setError(updateError.message);
    } else {
      setOrders((current) => current.map((order) => (order.id === orderId ? { ...order, status } : order)));
    }
    setUpdatingId(null);
  }

  const selectedOrder = orders.find((order) => order.id === selectedOrderId) ?? orders[0];

  return (
    <section>
      <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-600">Sales</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight">Orders</h1>
      {error ? <p className="mt-6 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">{error}</p> : null}

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_440px]">
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-black">All orders</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[920px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-slate-500"><tr><th className="py-3">Customer</th><th>Phone</th><th>Address</th><th>Payment</th><th>Total</th><th>Status</th><th>Created</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order.id} onClick={() => setSelectedOrderId(order.id)} className={`cursor-pointer ${selectedOrder?.id === order.id ? "bg-sky-50/70" : "hover:bg-slate-50"}`}>
                    <td className="py-4 font-black">{order.customer_name}</td>
                    <td className="text-slate-600">{order.phone}</td>
                    <td className="max-w-xs truncate text-slate-600">{order.delivery_address ?? "—"}</td>
                    <td>{order.payment_method}</td>
                    <td className="font-black">{formatPrice(Number(order.total_amount))}</td>
                    <td><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">{order.status}</span></td>
                    <td className="text-slate-500">{new Date(order.created_at).toLocaleString()}</td>
                  </tr>
                ))}
                {!orders.length ? <tr><td colSpan={7} className="py-8 text-center text-slate-500">{isLoading ? "Loading orders..." : "No orders found."}</td></tr> : null}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="h-fit rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 xl:sticky xl:top-8">
          <h2 className="text-xl font-black">Order details</h2>
          {selectedOrder ? (
            <div className="mt-5 space-y-5">
              <div className="rounded-2xl bg-slate-50 p-4 text-sm">
                <p className="font-black text-slate-950">{selectedOrder.customer_name}</p>
                <p className="mt-1 text-slate-600">{selectedOrder.phone}</p>
                <p className="mt-1 text-slate-600">{selectedOrder.delivery_address ?? "No address provided"}</p>
                <p className="mt-1 text-slate-600">Payment: {selectedOrder.payment_method}</p>
                <p className="mt-1 text-slate-600">Created: {new Date(selectedOrder.created_at).toLocaleString()}</p>
                {selectedOrder.notes ? <p className="mt-3 rounded-xl bg-white p-3 text-slate-600">{selectedOrder.notes}</p> : null}
              </div>

              <label className="grid gap-2 text-sm font-black text-slate-700">
                Status
                <select value={selectedOrder.status} disabled={updatingId === selectedOrder.id} onChange={(event) => updateStatus(selectedOrder.id, event.target.value as OrderStatus)} className="field-control">
                  {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </label>

              <div>
                <h3 className="font-black">Items</h3>
                <div className="mt-3 space-y-3">
                  {(selectedOrder.order_items ?? []).map((item) => (
                    <div key={item.id} className="rounded-2xl border border-slate-100 p-4 text-sm">
                      <div className="flex justify-between gap-4">
                        <p className="font-bold">{item.product_name}</p>
                        <p className="font-black">{formatPrice(Number(item.line_total))}</p>
                      </div>
                      <p className="mt-1 text-slate-500">Qty {item.quantity} × {formatPrice(Number(item.unit_price))}</p>
                    </div>
                  ))}
                  {!selectedOrder.order_items?.length ? <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">No order items found.</p> : null}
                </div>
              </div>

              <div className="flex justify-between border-t border-slate-200 pt-4 text-lg font-black">
                <span>Total</span>
                <span>{formatPrice(Number(selectedOrder.total_amount))}</span>
              </div>
            </div>
          ) : (
            <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">Select an order to view details.</p>
          )}
        </aside>
      </div>
    </section>
  );
}
