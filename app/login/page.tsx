"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-3xl font-bold">Log in</h1>
        <p className="mt-2 text-white/60">Continue to your Hookly dashboard.</p>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mt-6 w-full rounded-xl bg-black p-3 text-white"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="mt-4 w-full rounded-xl bg-black p-3 text-white"
        />

        <button
          onClick={handleLogin}
          className="mt-6 w-full rounded-xl bg-white px-6 py-3 font-semibold text-black"
        >
          Log in
        </button>
      </div>
    </main>
  );
}