import { NextResponse } from "next/server";
import { generatePayHereHash, getPayHereCheckoutUrl } from "../../../lib/payhere";
import { supabase } from "../../../lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      amount,
      message = "",
      originalAmount,
      originalCurrency,
      exchangeRate,
      feeAmount,
    } = body;

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

    // Always charge in LKR as payouts are only in LKR
    const checkoutCurrency = "LKR";

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Format amount for PayHere (2 decimal places)
    const formattedAmount = numAmount.toFixed(2);

    // Generate MD5 hash on server in LKR
    const hash = generatePayHereHash(orderId, numAmount, checkoutCurrency);

    // Compose informative item description & transaction record
    let itemsDescription = "Portfolio Project / Service Payment";
    if (message.trim()) {
      itemsDescription = `Portfolio Services - ${message.trim().substring(0, 45)}`;
    } else if (originalCurrency && originalCurrency !== "LKR" && originalAmount) {
      itemsDescription = `Portfolio Payment (${originalAmount} ${originalCurrency} incl. 3.3% fee)`;
    }

    // Combine audit info into stored message
    const auditNote =
      originalCurrency && originalCurrency !== "LKR" && originalAmount
        ? `[Converted: ${originalAmount} ${originalCurrency} @ 1 ${originalCurrency} = ${exchangeRate} LKR | 3.3% Fee: ${feeAmount} LKR]`
        : `[Direct LKR | 3.3% Fee: ${feeAmount || (numAmount * 0.033).toFixed(2)} LKR]`;
    const storedMessage = message.trim() ? `${message.trim()} | ${auditNote}` : auditNote;

    // Save pending transaction to Supabase database
    try {
      await supabase.from("payments").insert([
        {
          order_id: orderId,
          full_name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          amount: numAmount,
          currency: checkoutCurrency,
          message: storedMessage,
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
      items: itemsDescription,
      amount: formattedAmount,
      currency: checkoutCurrency,
      firstName,
      lastName,
      email: email.trim(),
      phone: phone.trim(),
      hash,
      returnUrl: `${baseUrl}/payment/success?order_id=${orderId}`,
      cancelUrl: `${baseUrl}/payment/cancel?order_id=${orderId}`,
      notifyUrl: `${baseUrl}/api/payhere/notify`,
      custom1: storedMessage.substring(0, 250),
    });
  } catch (error: any) {
    console.error("PayHere Checkout API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to initialize payment checkout" },
      { status: 500 }
    );
  }
}
