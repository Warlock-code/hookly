"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created. Check your email to confirm.");
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-3xl font-bold">Create account</h1>
        <p className="mt-2 text-white/60">Start using Hookly for free.</p>

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
          onClick={handleSignup}
          className="mt-6 w-full rounded-xl bg-white px-6 py-3 font-semibold text-black"
        >
          Sign up
        </button>
      </div>
    </main>
  );
}