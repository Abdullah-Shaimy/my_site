import { NextResponse } from "next/server";
import { DEFAULT_FALLBACK_TO_LKR_RATES } from "../../../lib/currencies";

export const dynamic = "force-dynamic";

let cachedRates: Record<string, number> | null = null;
let lastFetchedTime = 0;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour cache

export async function GET() {
  const now = Date.now();

  // Return in-memory cached rates if within 1 hour
  if (cachedRates && now - lastFetchedTime < CACHE_TTL_MS) {
    return NextResponse.json({
      success: true,
      source: "cache",
      rates: cachedRates,
      lastUpdated: new Date(lastFetchedTime).toISOString(),
    });
  }

  try {
    // Free open exchange rates endpoint (base USD)
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Exchange rate provider returned status ${res.status}`);
    }

    const data = await res.json();

    if (!data || !data.rates || !data.rates.LKR) {
      throw new Error("Invalid exchange rate response format");
    }

    const lkrPerUsd = data.rates.LKR;
    const computedToLkr: Record<string, number> = {
      ...DEFAULT_FALLBACK_TO_LKR_RATES,
      LKR: 1,
    };

    // Calculate (1 X in LKR) for every supported currency
    for (const [code, rateAgainstUsd] of Object.entries(data.rates)) {
      if (typeof rateAgainstUsd === "number" && rateAgainstUsd > 0) {
        // Since rateAgainstUsd = X per 1 USD, and lkrPerUsd = LKR per 1 USD:
        // 1 X = (lkrPerUsd / rateAgainstUsd) LKR
        computedToLkr[code] = parseFloat((lkrPerUsd / rateAgainstUsd).toFixed(4));
      }
    }

    computedToLkr["LKR"] = 1;

    cachedRates = computedToLkr;
    lastFetchedTime = now;

    return NextResponse.json({
      success: true,
      source: "live",
      rates: computedToLkr,
      lastUpdated: new Date(lastFetchedTime).toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn("Failed to fetch live exchange rates, using fallback:", message);

    // If cache already exists, reuse it even if expired
    if (cachedRates) {
      return NextResponse.json({
        success: true,
        source: "expired-cache",
        rates: cachedRates,
        lastUpdated: new Date(lastFetchedTime).toISOString(),
      });
    }

    // Return reliable hardcoded fallback rates
    return NextResponse.json({
      success: true,
      source: "fallback",
      rates: DEFAULT_FALLBACK_TO_LKR_RATES,
      lastUpdated: new Date().toISOString(),
    });
  }
}
