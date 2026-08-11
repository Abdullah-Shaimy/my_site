import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      return NextResponse.json({ error: "Missing order_id parameter" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("payments")
      .select("order_id, payment_id, full_name, email, phone, amount, currency, message, status, created_at")
      .eq("order_id", orderId)
      .single();

    if (error || !data) {
      // Return orderId with fallback status if record not found yet
      return NextResponse.json({
        order_id: orderId,
        status: "completed",
      });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch payment details" }, { status: 500 });
  }
}
