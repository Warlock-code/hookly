import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
        <h1 className="text-3xl font-bold">Payment received</h1>

        <p className="mt-3 text-white/60">
          Your Pro access should activate shortly after Paystack confirms the
          payment.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-black"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}