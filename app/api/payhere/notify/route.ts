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
    const custom1 = formData.get("custom_1") as string; // E.g., user ID

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

    if (statusCode === "2") {
      // Payment Success
      console.log(`Payment successful for order ${orderId}, payment ID: ${paymentId}`);
      
      // TODO: Update your database using Supabase Service Role key (so RLS doesn't block it)
      // Example:
      // await supabaseAdmin.from('orders').update({ status: 'paid' }).eq('id', orderId);
      
    } else if (statusCode === "0") {
      // Payment Pending
      console.log(`Payment pending for order ${orderId}`);
    } else if (statusCode === "-1" || statusCode === "-2" || statusCode === "-3") {
      // Payment Failed/Canceled
      console.log(`Payment failed/canceled for order ${orderId}`);
    }

    // PayHere requires a 200 response to acknowledge receipt
    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error processing PayHere webhook:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
