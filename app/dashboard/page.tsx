"use client";

import { useEffect, useState } from "react";
import GenerateForm from "../components/GenerateForm";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }

      setIsCheckingAuth(false);
    }

    checkUser();
  }, [router]);

  if (isCheckingAuth) {
    return (
      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <p>Checking authentication...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">Hookly Dashboard</h1>

        <p className="mt-2 text-white/60">
          Enter your video idea and generate hooks, captions, and hashtags.
        </p>

        <GenerateForm />
      </div>
    </main>
  );
}