"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Plan = {
  plan: string;
  subscription_status: string | null;
  current_period_end: string | null;
};

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    async function loadSettings() {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) return;

      setEmail(user.email || "");

      const { data } = await supabase
        .from("user_plans")
        .select("plan, subscription_status, current_period_end")
        .eq("user_id", user.id)
        .maybeSingle();

      setPlan(data);
    }

    loadSettings();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-3xl font-bold">Settings</h1>

        <div className="mt-6 space-y-4 text-white/70">
          <p>Email: {email || "Not logged in"}</p>
          <p>Plan: {plan?.plan || "free"}</p>
          <p>Status: {plan?.subscription_status || "inactive"}</p>
          <p>
            Period end:{" "}
            {plan?.current_period_end
              ? new Date(plan.current_period_end).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>
    </main>
  );
}