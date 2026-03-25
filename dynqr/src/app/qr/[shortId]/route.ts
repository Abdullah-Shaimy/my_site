import { NextResponse } from "next/server";
import { getCodeByShortIdDb, incrementScanDb } from "@/lib/db";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ shortId: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { shortId } = await context.params;
  const code = await getCodeByShortIdDb(shortId);

  if (!code) {
    return NextResponse.redirect(new URL("/?qr=not-found", request.url));
  }

  if (!code.active) {
    return NextResponse.redirect(new URL("/?qr=inactive", request.url));
  }

  try {
    const targetUrl = new URL(code.destinationUrl);
    await incrementScanDb(shortId);
    return NextResponse.redirect(targetUrl.toString(), 307);
  } catch {
    return NextResponse.redirect(new URL("/?qr=invalid-url", request.url));
  }
}
