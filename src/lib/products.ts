import { supabase } from "@/lib/supabase";
import { placeholderCategories, placeholderProducts } from "@/lib/placeholders";
import type { Category, Product } from "@/types/database";

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id,name,slug,description,image_url,is_active")
    .eq("is_active", true)
    .order("name", { ascending: true });

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

  return data?.length ? (data as Product[]) : placeholderProducts;
}
