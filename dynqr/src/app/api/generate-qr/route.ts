import { NextResponse } from "next/server";
import QRCode from "qrcode";

export const dynamic = "force-dynamic";

function normalizeFilename(value: string | null, fallback: string): string {
  if (!value) return fallback;
  const normalized = value.replace(/[^a-zA-Z0-9._-]/g, "_");
  return normalized || fallback;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text");
  const format = searchParams.get("format") === "svg" ? "svg" : "png";
  const download = searchParams.get("download") === "1";

  if (!text) {
    return NextResponse.json({ error: "Missing text query parameter." }, { status: 400 });
  }

  try {
    if (format === "svg") {
      const svg = await QRCode.toString(text, {
        type: "svg",
        width: 512,
        margin: 1,
      });

      const filename = normalizeFilename(searchParams.get("filename"), "dynqr.svg");

      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "no-store",
          ...(download ? { "Content-Disposition": `attachment; filename=\"${filename}\"` } : {}),
        },
      });
    }

    const pngBuffer = await QRCode.toBuffer(text, {
      type: "png",
      width: 512,
      margin: 1,
    });

    const filename = normalizeFilename(searchParams.get("filename"), "dynqr.png");
    const pngBytes = new Uint8Array(pngBuffer);

    return new NextResponse(pngBytes, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store",
        ...(download ? { "Content-Disposition": `attachment; filename=\"${filename}\"` } : {}),
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to generate QR code." }, { status: 500 });
  }
}
