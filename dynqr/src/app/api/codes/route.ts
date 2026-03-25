import { NextResponse } from "next/server";
import { createCode, listCodes } from "@/lib/db/mock-db";
import { validateUrl } from "@/lib/utils/validate-url";

export const dynamic = "force-dynamic";

type CreatePayload = {
  name?: unknown;
  destinationUrl?: unknown;
};

export async function GET() {
  return NextResponse.json({ data: listCodes() });
}

export async function POST(request: Request) {
  let body: CreatePayload;

  try {
    body = (await request.json()) as CreatePayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const destinationUrl = typeof body.destinationUrl === "string" ? body.destinationUrl.trim() : "";

  if (!name || !destinationUrl) {
    return NextResponse.json({ error: "Name and destinationUrl are required." }, { status: 400 });
  }

  if (!validateUrl(destinationUrl)) {
    return NextResponse.json({ error: "Please provide a valid http/https URL." }, { status: 400 });
  }

  const created = createCode({
    name,
    destinationUrl,
  });

  return NextResponse.json({ data: created }, { status: 201 });
}
