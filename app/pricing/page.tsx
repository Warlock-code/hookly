"use client";

import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function PricingPage() {
  async function handleUpgrade() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      alert("Please log in first.");
      window.location.href = "/login";
      return;
    }

    const response = await fetch("/api/paystack/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        userId: user.id,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Payment failed.");
      return;
    }

    window.location.href = data.authorizationUrl;
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-center text-4xl font-bold">Simple Pricing</h1>
        <p className="mt-2 text-center text-white/60">
          Start free. Upgrade when you need more generations.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">Free</h2>
            <p className="mt-2 text-white/60">For testing Hookly.</p>
            <p className="mt-6 text-4xl font-bold">GHS 0</p>

            <ul className="mt-6 space-y-3 text-white/70">
              <li>1 generation per day</li>
              <li>Hooks</li>
              <li>Captions</li>
              <li>Hashtags</li>
            </ul>

            <Link
              href="/dashboard"
              className="mt-6 block rounded-xl bg-white px-6 py-3 text-center font-semibold text-black"
            >
              Start Free
            </Link>
          </div>

          <div className="rounded-2xl border border-white bg-white p-6 text-black">
            <h2 className="text-2xl font-bold">Pro</h2>
            <p className="mt-2 text-black/60">For serious creators.</p>
            <p className="mt-6 text-4xl font-bold">GHS 120/month</p>

            <ul className="mt-6 space-y-3 text-black/70">
              <li>500 generations per month</li>
              <li>Better captions</li>
              <li>Saved history</li>
              <li>More tones</li>
            </ul>

            <button
              onClick={handleUpgrade}
              className="mt-6 w-full rounded-xl bg-black px-6 py-3 font-semibold text-white"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}