"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { Category } from "@/types/database";

type CategoryForm = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  sort_order: string;
  is_active: boolean;
};

const blankForm: CategoryForm = {
  name: "",
  slug: "",
  description: "",
  image_url: "",
  sort_order: "0",
  is_active: true
};

function toSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function AdminCategories() {
  const supabase = useMemo(() => createAdminSupabaseClient(), []);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<CategoryForm>(blankForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const loadCategories = useCallback(async function loadCategories() {
    setIsLoading(true);
    setError("");
    const { data, error: loadError } = await supabase
      .from("categories")
      .select("id,name,slug,description,image_url,sort_order,is_active,created_at")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (loadError) setError(loadError.message);
    else setCategories((data ?? []) as Category[]);
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  function startEdit(category: Category) {
    setForm({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description ?? "",
      image_url: category.image_url ?? "",
      sort_order: String(category.sort_order ?? 0),
      is_active: category.is_active
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim() || null,
      image_url: form.image_url.trim() || null,
      sort_order: Number.parseInt(form.sort_order, 10) || 0,
      is_active: form.is_active
    };

    const result = form.id
      ? await supabase.from("categories").update(payload).eq("id", form.id)
      : await supabase.from("categories").insert(payload);

    if (result.error) {
      setError(result.error.message);
    } else {
      setForm(blankForm);
      await loadCategories();
    }
    setIsSaving(false);
  }

  async function deleteCategory(category: Category) {
    if (!confirm(`Delete ${category.name}? Products in this category will keep working without a category.`)) return;
    const { error: deleteError } = await supabase.from("categories").delete().eq("id", category.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    await loadCategories();
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-600">Catalog</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Categories</h1>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-black">{form.id ? "Edit category" : "Add category"}</h2>
          <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value, slug: form.slug || toSlug(event.target.value) })} className="field-control" placeholder="Name" />
          <input required value={form.slug} onChange={(event) => setForm({ ...form, slug: toSlug(event.target.value) })} className="field-control" placeholder="slug" />
          <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="field-control" rows={3} placeholder="Description" />
          <input value={form.image_url} onChange={(event) => setForm({ ...form, image_url: event.target.value })} className="field-control" placeholder="Image URL" />
          <input type="number" value={form.sort_order} onChange={(event) => setForm({ ...form, sort_order: event.target.value })} className="field-control" placeholder="Sort order" />
          <label className="flex items-center gap-3 text-sm font-bold"><input type="checkbox" checked={form.is_active} onChange={(event) => setForm({ ...form, is_active: event.target.checked })} /> Active</label>
          {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
          <div className="flex gap-3">
            <button disabled={isSaving} className="button-primary flex-1" type="submit">{isSaving ? "Saving..." : form.id ? "Update category" : "Add category"}</button>
            {form.id ? <button type="button" onClick={() => setForm(blankForm)} className="button-secondary">Cancel</button> : null}
          </div>
        </form>
      </div>

      <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-black">All categories</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-slate-500"><tr><th className="py-3">Name</th><th>Slug</th><th>Sort</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="py-4"><p className="font-black">{category.name}</p><p className="max-w-sm truncate text-xs text-slate-500">{category.description}</p></td>
                  <td className="text-slate-600">/{category.slug}</td>
                  <td>{category.sort_order}</td>
                  <td>{category.is_active ? "Active" : "Hidden"}</td>
                  <td><button onClick={() => startEdit(category)} className="mr-2 rounded-full bg-slate-100 px-3 py-2 font-black">Edit</button><button onClick={() => deleteCategory(category)} className="rounded-full bg-red-50 px-3 py-2 font-black text-red-700">Delete</button></td>
                </tr>
              ))}
              {!categories.length ? <tr><td colSpan={5} className="py-8 text-center text-slate-500">{isLoading ? "Loading categories..." : "No categories found."}</td></tr> : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
