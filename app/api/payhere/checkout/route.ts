import { NextResponse } from "next/server";
import { generatePayHereHash, getPayHereCheckoutUrl } from "../../../lib/payhere";
import { supabase } from "../../../lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, amount, currency = "LKR", message = "" } = body;

    // Validation
    if (!fullName || !fullName.trim()) {
      return NextResponse.json({ error: "Full Name is required" }, { status: 400 });
    }
    if (!email || !email.trim() || !email.includes("@")) {
      return NextResponse.json({ error: "A valid Email Address is required" }, { status: 400 });
    }
    if (!phone || !phone.trim()) {
      return NextResponse.json({ error: "Phone Number is required" }, { status: 400 });
    }
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return NextResponse.json({ error: "Payment Amount must be greater than 0" }, { status: 400 });
    }

    const merchantId = process.env.PAYHERE_MERCHANT_ID;
    if (!merchantId) {
      return NextResponse.json(
        { error: "PayHere Merchant ID is not configured on the server." },
        { status: 500 }
      );
    }

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Format amount for PayHere (2 decimal places)
    const formattedAmount = numAmount.toFixed(2);

    // Generate MD5 hash on server (merchant secret stays secure)
    const hash = generatePayHereHash(orderId, numAmount, currency);

    // Save pending transaction to Supabase database (optional / fallback safe if DB fails)
    try {
      await supabase.from("payments").insert([
        {
          order_id: orderId,
          full_name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          amount: numAmount,
          currency: currency,
          message: message.trim() || null,
          status: "pending",
        },
      ]);
    } catch (dbError) {
      console.warn("Could not insert payment record to database:", dbError);
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const payhereUrl = getPayHereCheckoutUrl();

    // Split full name into first and last name for PayHere requirements
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "Customer";
    const lastName = nameParts.slice(1).join(" ") || "Client";

    return NextResponse.json({
      success: true,
      payhereUrl,
      merchantId,
      orderId,
      items: message.trim() ? `Portfolio Services - ${message.trim().substring(0, 50)}` : "Portfolio Project / Service Payment",
      amount: formattedAmount,
      currency,
      firstName,
      lastName,
      email: email.trim(),
      phone: phone.trim(),
      hash,
      returnUrl: `${baseUrl}/payment/success?order_id=${orderId}`,
      cancelUrl: `${baseUrl}/payment/cancel?order_id=${orderId}`,
      notifyUrl: `${baseUrl}/api/payhere/notify`,
      custom1: message.trim(),
    });
  } catch (error: any) {
    console.error("PayHere Checkout API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to initialize payment checkout" },
      { status: 500 }
    );
  }
}
