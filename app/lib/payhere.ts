import crypto from "crypto";

export function generatePayHereHash(
  orderId: string,
  amount: number,
  currency: string
) {
  const merchantId = process.env.PAYHERE_MERCHANT_ID;
  const merchantSecret = process.env.PAYHERE_SECRET;

  if (!merchantId || !merchantSecret) {
    throw new Error("PayHere credentials are not configured in environment variables.");
  }

  // The hash formula:
  // md5(merchant_id + order_id + amount + currency + md5(merchant_secret))
  // All strings must be formatted as requested by PayHere (amount typically formatted to 2 decimals)
  
  const formattedAmount = amount.toLocaleString("en-us", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).replace(/,/g, '');

  const secretHash = crypto
    .createHash("md5")
    .update(merchantSecret)
    .digest("hex")
    .toUpperCase();

  const hashString = `${merchantId}${orderId}${formattedAmount}${currency}${secretHash}`;

  const finalHash = crypto
    .createHash("md5")
    .update(hashString)
    .digest("hex")
    .toUpperCase();

  return finalHash;
}

export function verifyPayHereSignature(
  merchantId: string,
  orderId: string,
  payhereAmount: string,
  payhereCurrency: string,
  statusCode: string,
  md5sig: string
) {
  const merchantSecret = process.env.PAYHERE_SECRET;

  if (!merchantSecret) {
    throw new Error("PayHere credentials are not configured.");
  }

  const secretHash = crypto
    .createHash("md5")
    .update(merchantSecret)
    .digest("hex")
    .toUpperCase();

  const hashString = `${merchantId}${orderId}${payhereAmount}${payhereCurrency}${statusCode}${secretHash}`;

  const expectedHash = crypto
    .createHash("md5")
    .update(hashString)
    .digest("hex")
    .toUpperCase();

  return expectedHash === md5sig;
}
