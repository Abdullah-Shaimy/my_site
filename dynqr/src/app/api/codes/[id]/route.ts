import { NextResponse } from "next/server";
import { deleteCode, getCodeById, updateCode } from "@/lib/db/mock-db";
import type { UpdateQRCodeInput } from "@/lib/types";
import { validateUrl } from "@/lib/utils/validate-url";

export const dynamic = "force-dynamic";

type UpdatePayload = {
  name?: unknown;
  destinationUrl?: unknown;
  active?: unknown;
};

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const code = getCodeById(id);

  if (!code) {
    return NextResponse.json({ error: "QR code not found." }, { status: 404 });
  }

  return NextResponse.json({ data: code });
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;

  let body: UpdatePayload;
  try {
    body = (await request.json()) as UpdatePayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const updates: UpdateQRCodeInput = {};

  if (typeof body.name === "string") {
    const trimmed = body.name.trim();
    if (!trimmed) {
      return NextResponse.json({ error: "Name cannot be empty." }, { status: 400 });
    }
    updates.name = trimmed;
  }

  if (typeof body.destinationUrl === "string") {
    const trimmedUrl = body.destinationUrl.trim();
    if (!validateUrl(trimmedUrl)) {
      return NextResponse.json({ error: "Please provide a valid http/https URL." }, { status: 400 });
    }
    updates.destinationUrl = trimmedUrl;
  }

  if (typeof body.active === "boolean") {
    updates.active = body.active;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No valid fields provided for update." }, { status: 400 });
  }

  const updated = updateCode(id, updates);

  if (!updated) {
    return NextResponse.json({ error: "QR code not found." }, { status: 404 });
  }

  return NextResponse.json({ data: updated });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const ok = deleteCode(id);

  if (!ok) {
    return NextResponse.json({ error: "QR code not found." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
