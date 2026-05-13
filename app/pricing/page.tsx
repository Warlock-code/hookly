import Link from "next/link";

export default function PricingPage() {
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
            <p className="mt-6 text-4xl font-bold">$0</p>

            <ul className="mt-6 space-y-3 text-white/70">
              <li>5 generations per day</li>
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
            <p className="mt-6 text-4xl font-bold">$10/month</p>

            <ul className="mt-6 space-y-3 text-black/70">
              <li>500 generations per month</li>
              <li>Better captions</li>
              <li>Saved history</li>
              <li>More tones</li>
            </ul>

            <button className="mt-6 w-full rounded-xl bg-black px-6 py-3 font-semibold text-white">
              Upgrade Soon
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}