import { supabase } from "@/lib/supabase";
import { placeholderCategories, placeholderProducts } from "@/lib/placeholders";
import type { Category, Product } from "@/types/database";

type ProductCategory = Pick<Category, "id" | "name" | "slug">;

type SupabaseProductRow = Omit<Product, "categories" | "created_at"> & {
  categories?: ProductCategory | ProductCategory[] | null;
  created_at?: string;
};

function mapSupabaseProduct(row: SupabaseProductRow): Product {
  const category = Array.isArray(row.categories)
    ? row.categories[0] ?? null
    : row.categories ?? null;

  return {
    ...row,
    categories: category,
  };
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id,name,slug,description,image_url,sort_order,is_active")
    .eq("is_active", true)
    .order("sort_order", { ascending: true }).order("name", { ascending: true });

  if (error) {
    console.error("Failed to load categories", error.message);
    return placeholderCategories;
  }

  return data?.length ? data : placeholderCategories;
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id,category_id,name,slug,short_description,description,price,image_url,stock_status,is_featured,is_active,categories(id,name,slug)")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load products", error.message);
    return placeholderProducts;
  }

  return data?.length ? data.map(mapSupabaseProduct) : placeholderProducts;
}
