"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/format";
import type { Category, Product } from "@/types/database";

type ProductForm = {
  id?: string;
  name: string;
  slug: string;
  category_id: string;
  price: string;
  short_description: string;
  description: string;
  image_url: string;
  stock_status: Product["stock_status"];
  is_featured: boolean;
  is_active: boolean;
};

const blankForm: ProductForm = {
  name: "",
  slug: "",
  category_id: "",
  price: "0",
  short_description: "",
  description: "",
  image_url: "",
  stock_status: "in_stock",
  is_featured: false,
  is_active: true
};

function toSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function AdminProducts() {
  const supabase = useMemo(() => createAdminSupabaseClient(), []);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<ProductForm>(blankForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const loadData = useCallback(async function loadData() {
    setIsLoading(true);
    setError("");
    const [productsResult, categoriesResult] = await Promise.all([
      supabase
        .from("products")
        .select("id,category_id,name,slug,short_description,description,price,image_url,stock_status,is_featured,is_active,created_at,categories(id,name,slug)")
        .order("created_at", { ascending: false }),
      supabase.from("categories").select("id,name,slug,description,image_url,sort_order,is_active,created_at").order("name", { ascending: true })
    ]);

    const firstError = productsResult.error ?? categoriesResult.error;
    if (firstError) {
      setError(firstError.message);
    } else {
      setProducts(
        ((productsResult.data ?? []) as Array<Omit<Product, "categories"> & { categories?: Product["categories"] | Product["categories"][] }>).map((product) => ({
          ...product,
          categories: Array.isArray(product.categories) ? product.categories[0] ?? null : product.categories ?? null
        }))
      );
      setCategories((categoriesResult.data ?? []) as Category[]);
    }
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  function startEdit(product: Product) {
    setForm({
      id: product.id,
      name: product.name,
      slug: product.slug,
      category_id: product.category_id ?? "",
      price: String(product.price),
      short_description: product.short_description ?? "",
      description: product.description ?? "",
      image_url: product.image_url ?? "",
      stock_status: product.stock_status,
      is_featured: product.is_featured,
      is_active: product.is_active
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      category_id: form.category_id || null,
      price: Number(form.price),
      short_description: form.short_description.trim() || null,
      description: form.description.trim() || null,
      image_url: form.image_url.trim() || null,
      stock_status: form.stock_status,
      is_featured: form.is_featured,
      is_active: form.is_active
    };

    const result = form.id
      ? await supabase.from("products").update(payload).eq("id", form.id)
      : await supabase.from("products").insert(payload);

    if (result.error) {
      setError(result.error.message);
    } else {
      setForm(blankForm);
      await loadData();
    }
    setIsSaving(false);
  }

  async function deleteProduct(product: Product) {
    if (!confirm(`Delete ${product.name}? This cannot be undone.`)) return;
    const { error: deleteError } = await supabase.from("products").delete().eq("id", product.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    await loadData();
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-600">Catalog</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Products</h1>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-black">{form.id ? "Edit product" : "Add product"}</h2>
          <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value, slug: form.slug || toSlug(event.target.value) })} className="field-control" placeholder="Name" />
          <input required value={form.slug} onChange={(event) => setForm({ ...form, slug: toSlug(event.target.value) })} className="field-control" placeholder="slug" />
          <select value={form.category_id} onChange={(event) => setForm({ ...form, category_id: event.target.value })} className="field-control">
            <option value="">No category</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
          <input required type="number" min="0" step="0.01" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} className="field-control" placeholder="Price" />
          <input value={form.short_description} onChange={(event) => setForm({ ...form, short_description: event.target.value })} className="field-control" placeholder="Short description" />
          <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="field-control" rows={4} placeholder="Description" />
          <input value={form.image_url} onChange={(event) => setForm({ ...form, image_url: event.target.value })} className="field-control" placeholder="Image URL" />
          <select value={form.stock_status} onChange={(event) => setForm({ ...form, stock_status: event.target.value as Product["stock_status"] })} className="field-control">
            <option value="in_stock">In stock</option>
            <option value="low_stock">Low stock</option>
            <option value="out_of_stock">Out of stock</option>
          </select>
          <label className="flex items-center gap-3 text-sm font-bold"><input type="checkbox" checked={form.is_featured} onChange={(event) => setForm({ ...form, is_featured: event.target.checked })} /> Featured</label>
          <label className="flex items-center gap-3 text-sm font-bold"><input type="checkbox" checked={form.is_active} onChange={(event) => setForm({ ...form, is_active: event.target.checked })} /> Active</label>
          {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
          <div className="flex gap-3">
            <button disabled={isSaving} className="button-primary flex-1" type="submit">{isSaving ? "Saving..." : form.id ? "Update product" : "Add product"}</button>
            {form.id ? <button type="button" onClick={() => setForm(blankForm)} className="button-secondary">Cancel</button> : null}
          </div>
        </form>
      </div>

      <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-black">All products</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-slate-500"><tr><th className="py-3">Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Flags</th><th>Actions</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="py-4"><p className="font-black">{product.name}</p><p className="text-xs text-slate-500">/{product.slug}</p></td>
                  <td className="text-slate-600">{product.categories?.name ?? "—"}</td>
                  <td className="font-black">{formatPrice(Number(product.price))}</td>
                  <td>{product.stock_status}</td>
                  <td className="text-xs"><span>{product.is_active ? "Active" : "Hidden"}</span>{product.is_featured ? <span className="ml-2 rounded-full bg-sky-50 px-2 py-1 font-black text-sky-700">Featured</span> : null}</td>
                  <td><button onClick={() => startEdit(product)} className="mr-2 rounded-full bg-slate-100 px-3 py-2 font-black">Edit</button><button onClick={() => deleteProduct(product)} className="rounded-full bg-red-50 px-3 py-2 font-black text-red-700">Delete</button></td>
                </tr>
              ))}
              {!products.length ? <tr><td colSpan={6} className="py-8 text-center text-slate-500">{isLoading ? "Loading products..." : "No products found."}</td></tr> : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
