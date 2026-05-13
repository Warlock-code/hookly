"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.push("/login");
  }

  return (
    <header className="border-b border-white/10 bg-black text-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          Hookly
        </Link>

        <div className="flex items-center gap-4 text-sm text-white/70">
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="hover:text-white">
                Dashboard
              </Link>

              <Link href="/history" className="hover:text-white">
                History
              </Link>

              <button onClick={handleLogout} className="hover:text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-white">
                Login
              </Link>

              <Link href="/signup" className="hover:text-white">
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}