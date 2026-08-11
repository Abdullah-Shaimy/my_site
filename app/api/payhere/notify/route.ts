import { NextResponse } from "next/server";
import { verifyPayHereSignature } from "../../../lib/payhere";
import { supabase } from "../../../lib/supabase";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const merchantId = formData.get("merchant_id") as string;
    const orderId = formData.get("order_id") as string;
    const payhereAmount = formData.get("payhere_amount") as string;
    const payhereCurrency = formData.get("payhere_currency") as string;
    const statusCode = formData.get("status_code") as string;
    const md5sig = formData.get("md5sig") as string;
    const paymentId = formData.get("payment_id") as string;

    if (!merchantId || !orderId || !payhereAmount || !payhereCurrency || !statusCode || !md5sig) {
      return NextResponse.json({ error: "Missing required webhook parameters" }, { status: 400 });
    }

    const isValid = verifyPayHereSignature(
      merchantId,
      orderId,
      payhereAmount,
      payhereCurrency,
      statusCode,
      md5sig
    );

    if (!isValid) {
      console.error("Invalid PayHere signature for order:", orderId);
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    let status = "pending";
    if (statusCode === "2") {
      status = "paid";
    } else if (statusCode === "0") {
      status = "pending";
    } else if (statusCode === "-1" || statusCode === "-2" || statusCode === "-3") {
      status = statusCode === "-2" ? "canceled" : "failed";
    }

    // Update database status in Supabase
    try {
      await supabase
        .from("payments")
        .update({
          status,
          payment_id: paymentId || null,
          payhere_status_code: parseInt(statusCode, 10),
          updated_at: new Date().toISOString(),
        })
        .eq("order_id", orderId);
    } catch (dbErr) {
      console.error("Failed to update payment status in Supabase:", dbErr);
    }

    // PayHere requires a 200 response to acknowledge receipt
    return NextResponse.json({ status: "success", order_id: orderId, payment_status: status }, { status: 200 });
  } catch (error) {
    console.error("Error processing PayHere webhook:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
