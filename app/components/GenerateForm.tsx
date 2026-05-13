"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

type GeneratedContent = {
  hooks: string[];
  captions: string[];
  hashtags: string[];
};

export default function GenerateForm() {
  const [idea, setIdea] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [tone, setTone] = useState("Funny");
  const [audience, setAudience] = useState("");
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showLimitPopup, setShowLimitPopup] = useState(false);

  async function handleGenerate() {
  if (!idea.trim()) {
    setMessage("Please enter a video idea first.");
    return;
  }

  setIsLoading(true);
  setMessage("Generating content...");

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;

  if (!userId) {
    setIsLoading(false);
    setMessage("Please log in first.");
    return;
  }

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idea,
      platform,
      tone,
      audience,
      userId,
    }),
  });

  const data = await response.json();

  setIsLoading(false);

  if (!response.ok) {
  const errorMessage = data.error || "Something went wrong.";

  setMessage(errorMessage);

  if (response.status === 403) {
    setShowLimitPopup(true);
  }

  return;
}

  setResult(data);

  await supabase.from("generations").insert({
    user_id: userId,
    idea,
    platform,
    tone,
    audience,
    hooks: data.hooks,
    captions: data.captions,
    hashtags: data.hashtags,
  });

  setMessage("Content generated and saved successfully.");
}

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="min-h-32 w-full rounded-xl border border-white/10 bg-black p-4 text-white outline-none"
          placeholder="Example: A barber showing a fresh haircut transformation"
        />

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="rounded-xl bg-black p-3 text-white">
            <option>TikTok</option>
            <option>Instagram</option>
            <option>YouTube Shorts</option>
          </select>

          <select value={tone} onChange={(e) => setTone(e.target.value)} className="rounded-xl bg-black p-3 text-white">
            <option>Funny</option>
            <option>Bold</option>
            <option>Professional</option>
            <option>Luxury</option>
            <option>Motivational</option>
          </select>

          <input value={audience} onChange={(e) => setAudience(e.target.value)} className="rounded-xl bg-black p-3 text-white" placeholder="Audience" />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="mt-4 rounded-xl bg-white px-6 py-3 font-semibold text-black disabled:opacity-60"
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
        {message && <p className="mt-3 text-sm text-white/60">{message}</p>}
      </div>

         {showLimitPopup && (
  <div className="rounded-2xl border border-white/10 bg-white p-6 text-black">
    <h2 className="text-2xl font-bold">Free limit reached</h2>

    <p className="mt-2 text-black/60">
      You get 1 free generation per day. Upgrade to Pro or share Hookly to get
      one extra generation.
    </p>

    <div className="mt-6 flex gap-3">
      <button
        onClick={() => alert("Pro upgrade coming soon.")}
        className="rounded-xl bg-black px-5 py-3 font-semibold text-white"
      >
        Upgrade to Pro
      </button>

      <button
  onClick={async () => {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;

  if (!userId) {
    setMessage("Please log in first.");
    return;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("referral_code")
    .eq("id", userId)
    .single();

  if (error || !profile) {
    setMessage("Referral profile not found. Please sign out and sign up again.");
    return;
  }

  const referralLink = `https://hookly-git-main-animbronyinaa-9864s-projects.vercel.app/signup?ref=${profile.referral_code}`;

  await navigator.clipboard.writeText(
    `Try Hookly — AI captions for TikTok & Instagram creators 🚀 ${referralLink}`
  );

  setMessage("Referral link copied. You’ll get 1 extra generation when a friend signs up.");
}}
        className="rounded-xl border border-black/10 px-5 py-3 font-semibold"
      >
        Share Hookly
      </button>

      <button
        onClick={() => setShowLimitPopup(false)}
        className="rounded-xl px-5 py-3 font-semibold text-black/60"
      >
        Close
      </button>
    </div>
  </div>
)}

      {result && (
        <div className="space-y-4">
          <ResultSection title="Hooks" items={result.hooks} />
          <ResultSection title="Captions" items={result.captions} />
          <ResultSection title="Hashtags" items={result.hashtags} />
        </div>
      )}
    </div>
  );
}

function ResultSection({ title, items }: { title: string; items: string[] }) {
  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
    alert("Copied!");
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-xl font-bold">{title}</h2>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-center justify-between gap-4 rounded-xl bg-black p-4">
            <p className="text-white/80">{item}</p>

            <button onClick={() => copyText(item)} className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/70">
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}