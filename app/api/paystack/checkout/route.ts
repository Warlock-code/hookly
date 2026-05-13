import { NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, userId } = body;

    if (!email || !userId) {
      return NextResponse.json(
        { error: "Email and userId are required." },
        { status: 400 }
      );
    }

    const amountInPesewas = 12000; // GHS 120.00/month

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountInPesewas,
        currency: "GHS",
        metadata: {
          userId,
          plan: "pro",
        },
        callback_url: "https://hookly-git-main-animbronyinaa-9864s-projects.vercel.app/payment/success",
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.status) {
      return NextResponse.json(
        { error: data.message || "Failed to initialize payment." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Payment error." },
      { status: 500 }
    );
  }
}