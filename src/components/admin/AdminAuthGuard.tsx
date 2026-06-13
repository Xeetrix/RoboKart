"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isSupabaseAdmin } from "@/lib/supabase/adminAuth";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" }
];

export function AdminAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = useMemo(() => createAdminSupabaseClient(), []);
  const [isChecking, setIsChecking] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      return undefined;
    }

    let isMounted = true;

    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;

      if (!data.session) {
        router.replace("/admin/login");
        return;
      }

      if (!isSupabaseAdmin(data.session.user)) {
        await supabase.auth.signOut();
        router.replace("/admin/login");
        return;
      }

      setEmail(data.session.user.email ?? null);
      setIsChecking(false);
    }

    void checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/admin/login");
        return;
      }
      if (!isSupabaseAdmin(session.user)) {
        void supabase.auth.signOut();
        router.replace("/admin/login");
        return;
      }
      setEmail(session.user.email ?? null);
      setIsChecking(false);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [isLoginPage, router, supabase]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/10 px-6 py-5 text-sm font-black shadow-2xl shadow-sky-950/40">
          Checking admin session...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/admin" className="text-lg font-black text-slate-950">Robokart Admin</Link>
          <button onClick={handleSignOut} className="rounded-full bg-slate-950 px-4 py-2 text-xs font-black text-white">Logout</button>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-4 pb-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-black ${pathname === item.href ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-600"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="mx-auto flex max-w-[1500px]">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-200 bg-slate-950 p-6 text-white lg:block">
          <Link href="/admin" className="text-2xl font-black">Robokart Admin</Link>
          <p className="mt-2 text-sm text-slate-400">Manage catalog and orders.</p>
          <nav className="mt-10 grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-4 py-3 text-sm font-black transition ${pathname === item.href ? "bg-sky-500 text-white shadow-lg shadow-sky-950/30" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Signed in</p>
            <p className="mt-2 truncate text-sm font-bold text-slate-200">{email}</p>
            <button onClick={handleSignOut} className="mt-4 w-full rounded-full bg-white px-4 py-2 text-sm font-black text-slate-950">Logout</button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
