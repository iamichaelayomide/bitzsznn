"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    const response = await fetch("/api/admin/login", { body: JSON.stringify({ password }), headers: { "Content-Type": "application/json" }, method: "POST" });
    if (!response.ok) { const payload = await response.json(); setError(payload.error ?? "Unable to sign in."); setLoading(false); return; }
    router.replace("/admin"); router.refresh();
  }

  return <main className="min-h-screen bg-[#0f1c07] px-4 pt-32 text-white"><form className="mx-auto max-w-md rounded-[28px] border border-white/12 bg-white/[0.07] p-7 shadow-2xl backdrop-blur md:p-10" onSubmit={submit}><p className="font-mono text-xs uppercase tracking-[0.18em] text-[#b8ff2c]">Private access</p><h1 className="section-title mt-4">Bitzsznn admin</h1><p className="mt-4 text-sm leading-6 text-white/65">Sign in to view guest details, RSVP totals, and paid ticket orders.</p><label className="mt-7 grid gap-2 text-sm font-bold">Admin password<input autoComplete="current-password" className="min-h-12 rounded-2xl border border-white/15 bg-black/25 px-4 text-white outline-none focus:border-[#b8ff2c]" onChange={(event) => setPassword(event.target.value)} required type="password" value={password} /></label>{error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}<button className="mt-6 min-h-12 w-full rounded-[14px] bg-[#459c0a] px-5 font-bold text-[#061006] disabled:opacity-50" disabled={loading} type="submit">{loading ? "Signing in..." : "Open dashboard"}</button></form></main>;
}
