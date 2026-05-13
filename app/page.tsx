import Link from "next/link";
import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70">
          AI captions for TikTok & Instagram creators
        </p>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Generate viral hooks, captions, and hashtags in seconds.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-white/60">
          Hookly helps creators turn simple video ideas into scroll-stopping
          content for TikTok, Instagram Reels, and YouTube Shorts.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/dashboard"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-black"
          >
            Start Free
          </Link>

          <Link
            href="/pricing"
            className="rounded-xl border border-white/20 px-6 py-3 font-semibold"
          >
            Pricing
          </Link>
        </div>
      </section>
    </main>
  );
}