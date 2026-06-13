"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isSupabaseAdmin } from "@/lib/supabase/adminAuth";

export function AdminLoginForm() {
  const router = useRouter();
  const supabase = useMemo(() => createAdminSupabaseClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
      return;
    }

    if (!isSupabaseAdmin(data.user)) {
      await supabase.auth.signOut();
      setError("This account is not marked as a Robokart admin.");
      setIsLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-700/20 blur-3xl" />
      </div>
      <form onSubmit={handleSubmit} className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-white p-6 text-slate-950 shadow-2xl shadow-sky-950/40 sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-600">Admin Login</p>
        <h1 className="mt-3 text-3xl font-black">Welcome back</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">Sign in with your Supabase Auth email and password. No default admin credentials are stored in the app.</p>

        <div className="mt-8 grid gap-5">
          <label className="grid gap-2 text-sm font-black text-slate-700">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="field-control font-normal"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>
          <label className="grid gap-2 text-sm font-black text-slate-700">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="field-control font-normal"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>
        </div>

        {error ? <p className="mt-5 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}

        <button type="submit" disabled={isLoading} className="button-primary mt-6 w-full py-3">
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
