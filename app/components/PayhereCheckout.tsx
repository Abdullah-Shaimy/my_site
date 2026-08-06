"use client";

import { useState } from "react";
import Script from "next/script";

interface PayhereCheckoutProps {
  orderId: string;
  items: string;
  amount: number;
  currency?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  onSuccess?: (paymentId: string) => void;
  onDismissed?: () => void;
  onError?: (error: string) => void;
}

export default function PayhereCheckout({
  orderId,
  items,
  amount,
  currency = "LKR",
  firstName,
  lastName,
  email,
  phone,
  address,
  city,
  country,
  onSuccess,
  onDismissed,
  onError,
}: PayhereCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    setLoading(true);
    try {
      // 1. Fetch hash from our backend API
      const response = await fetch("/api/payhere/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, amount, currency }),
      });

      if (!response.ok) {
        throw new Error("Failed to initialize payment");
      }

      const { hash, merchantId, env } = await response.json();

      // 2. Configure PayHere Payment Object
      const payment = {
        sandbox: env === "sandbox",
        merchant_id: merchantId,
        return_url: `${window.location.origin}/user`, // Redirect after success
        cancel_url: `${window.location.origin}/user`, // Redirect after cancel
        notify_url: `${window.location.origin}/api/payhere/notify`, // Webhook URL
        order_id: orderId,
        items: items,
        amount: amount.toLocaleString("en-us", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,/g, ''),
        currency: currency,
        hash: hash,
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        address: address,
        city: city,
        country: country,
      };

      // 3. Register Event Listeners
      // @ts-ignore - payhere is injected via script
      window.payhere.onCompleted = function onCompleted(paymentId: string) {
        console.log("Payment completed. ID:", paymentId);
        if (onSuccess) onSuccess(paymentId);
      };

      // @ts-ignore
      window.payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed");
        if (onDismissed) onDismissed();
      };

      // @ts-ignore
      window.payhere.onError = function onError(errorMsg: string) {
        console.log("Payment error:", errorMsg);
        if (onError) onError(errorMsg);
      };

      // 4. Start Payment
      // @ts-ignore
      window.payhere.startPayment(payment);
    } catch (error: any) {
      console.error(error);
      if (onError) onError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://www.payhere.lk/lib/payhere.js" strategy="lazyOnload" />
      <button
        onClick={startPayment}
        disabled={loading}
        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
      >
        {loading ? "Processing..." : `Pay ${currency} ${amount}`}
      </button>
    </>
  );
}
