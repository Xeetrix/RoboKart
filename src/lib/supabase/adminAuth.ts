import type { User } from "@supabase/supabase-js";

export function isSupabaseAdmin(user: User | null | undefined) {
  return user?.app_metadata?.role === "admin";
}
