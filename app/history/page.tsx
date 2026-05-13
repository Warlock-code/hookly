"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Generation = {
  id: string;
  idea: string;
  platform: string;
  tone: string;
  audience: string | null;
  hooks: string[];
  captions: string[];
  hashtags: string[];
  created_at: string;
};

export default function HistoryPage() {
  const [generations, setGenerations] = useState<Generation[]>([]);

  useEffect(() => {
    async function fetchHistory() {
      const { data, error } = await supabase
        .from("generations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        alert(error.message);
        return;
      }

      setGenerations(data || []);
    }

    fetchHistory();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold">History</h1>
        <p className="mt-2 text-white/60">Your saved Hookly generations.</p>

        <div className="mt-8 space-y-4">
          {generations.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm text-white/40">
                {new Date(item.created_at).toLocaleString()}
              </p>

              <h2 className="mt-2 text-xl font-bold">{item.idea}</h2>

              <p className="mt-1 text-sm text-white/60">
                {item.platform} • {item.tone} • {item.audience || "General"}
              </p>

              <div className="mt-4 space-y-2">
                {item.hooks.map((hook) => (
                  <p key={hook} className="rounded-xl bg-black p-3 text-white/80">
                    {hook}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {generations.length === 0 && (
            <p className="text-white/60">No saved generations yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}