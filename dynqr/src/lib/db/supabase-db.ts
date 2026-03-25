import { generateShortId } from "@/lib/utils/generate-short-id";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { CreateQRCodeInput, QRCodeRecord, UpdateQRCodeInput } from "@/lib/types";

type QRCodeRow = {
  id: string;
  short_id: string;
  name: string;
  destination_url: string;
  active: boolean;
  scans: number;
  last_scanned_at: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
};

const TABLE = "qr_codes";

function mapRow(row: QRCodeRow): QRCodeRecord {
  return {
    id: row.id,
    shortId: row.short_id,
    name: row.name,
    destinationUrl: row.destination_url,
    active: row.active,
    scans: row.scans,
    lastScannedAt: row.last_scanned_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    userId: row.user_id,
  };
}

function toRowUpdate(input: UpdateQRCodeInput): Record<string, string | boolean> {
  const out: Record<string, string | boolean> = {};

  if (typeof input.name === "string") out.name = input.name;
  if (typeof input.destinationUrl === "string") out.destination_url = input.destinationUrl;
  if (typeof input.active === "boolean") out.active = input.active;

  return out;
}

export function hasSupabaseConfig(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function listCodesFromSupabase(userId = "demo-user"): Promise<QRCodeRecord[]> {
  const client = createServerSupabaseClient();
  if (!client) return [];

  const { data, error } = await client
    .from(TABLE)
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to list QR codes.");
  }

  return data.map((row) => mapRow(row as QRCodeRow));
}

export async function getCodeByIdFromSupabase(id: string, userId = "demo-user"): Promise<QRCodeRecord | null> {
  const client = createServerSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;
  return mapRow(data as QRCodeRow);
}

export async function getCodeByShortIdFromSupabase(shortId: string): Promise<QRCodeRecord | null> {
  const client = createServerSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from(TABLE)
    .select("*")
    .eq("short_id", shortId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;
  return mapRow(data as QRCodeRow);
}

export async function createCodeInSupabase(input: CreateQRCodeInput, userId = "demo-user"): Promise<QRCodeRecord> {
  const client = createServerSupabaseClient();
  if (!client) throw new Error("Supabase client not configured.");

  const now = new Date().toISOString();
  const payload = {
    id: crypto.randomUUID(),
    short_id: generateShortId(8),
    name: input.name,
    destination_url: input.destinationUrl,
    active: true,
    scans: 0,
    last_scanned_at: null,
    created_at: now,
    updated_at: now,
    user_id: userId,
  };

  const { data, error } = await client.from(TABLE).insert(payload).select("*").single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create QR code.");
  }

  return mapRow(data as QRCodeRow);
}

export async function updateCodeInSupabase(
  id: string,
  input: UpdateQRCodeInput,
  userId = "demo-user"
): Promise<QRCodeRecord | null> {
  const client = createServerSupabaseClient();
  if (!client) return null;

  const payload = {
    ...toRowUpdate(input),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await client
    .from(TABLE)
    .update(payload)
    .eq("id", id)
    .eq("user_id", userId)
    .select("*")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;
  return mapRow(data as QRCodeRow);
}

export async function deleteCodeInSupabase(id: string, userId = "demo-user"): Promise<boolean> {
  const client = createServerSupabaseClient();
  if (!client) return false;

  const { error, count } = await client
    .from(TABLE)
    .delete({ count: "exact" })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return (count ?? 0) > 0;
}

export async function incrementScanInSupabase(shortId: string): Promise<QRCodeRecord | null> {
  const client = createServerSupabaseClient();
  if (!client) return null;

  const current = await getCodeByShortIdFromSupabase(shortId);
  if (!current) return null;

  const { data, error } = await client
    .from(TABLE)
    .update({
      scans: current.scans + 1,
      last_scanned_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", current.id)
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to increment scan.");
  }

  return mapRow(data as QRCodeRow);
}
