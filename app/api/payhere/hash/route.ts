import { NextResponse } from "next/server";
import { generatePayHereHash } from "../../../lib/payhere";
import { supabase } from "../../../lib/supabase"; // Use server client or admin if tracking orders in DB

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, amount, currency } = body;

    if (!orderId || !amount || !currency) {
      return NextResponse.json(
        { error: "Missing required parameters: orderId, amount, currency" },
        { status: 400 }
      );
    }

    const hash = generatePayHereHash(orderId, amount, currency);
    const merchantId = process.env.PAYHERE_MERCHANT_ID;
    const env = process.env.NEXT_PUBLIC_PAYHERE_ENV || "sandbox";

    return NextResponse.json({
      hash,
      merchantId,
      env
    });
  } catch (error) {
    console.error("Error generating PayHere hash:", error);
    return NextResponse.json(
      { error: "Failed to generate hash" },
      { status: 500 }
    );
  }
}
