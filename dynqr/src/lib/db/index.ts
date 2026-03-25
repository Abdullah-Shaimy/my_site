import {
  createCode,
  deleteCode,
  getCodeById,
  getCodeByShortId,
  incrementScan,
  listCodes,
  updateCode,
} from "@/lib/db/mock-db";
import {
  createCodeInSupabase,
  deleteCodeInSupabase,
  getCodeByIdFromSupabase,
  getCodeByShortIdFromSupabase,
  hasSupabaseConfig,
  incrementScanInSupabase,
  listCodesFromSupabase,
  updateCodeInSupabase,
} from "@/lib/db/supabase-db";
import type { CreateQRCodeInput, QRCodeRecord, UpdateQRCodeInput } from "@/lib/types";

function shouldUseSupabase() {
  return hasSupabaseConfig();
}

export async function listCodesDb(userId = "demo-user"): Promise<QRCodeRecord[]> {
  if (!shouldUseSupabase()) return listCodes(userId);

  try {
    return await listCodesFromSupabase(userId);
  } catch {
    return listCodes(userId);
  }
}

export async function getCodeByIdDb(id: string, userId = "demo-user"): Promise<QRCodeRecord | null> {
  if (!shouldUseSupabase()) return getCodeById(id, userId);

  try {
    return await getCodeByIdFromSupabase(id, userId);
  } catch {
    return getCodeById(id, userId);
  }
}

export async function getCodeByShortIdDb(shortId: string): Promise<QRCodeRecord | null> {
  if (!shouldUseSupabase()) return getCodeByShortId(shortId);

  try {
    return await getCodeByShortIdFromSupabase(shortId);
  } catch {
    return getCodeByShortId(shortId);
  }
}

export async function createCodeDb(input: CreateQRCodeInput, userId = "demo-user"): Promise<QRCodeRecord> {
  if (!shouldUseSupabase()) return createCode(input, userId);

  try {
    return await createCodeInSupabase(input, userId);
  } catch {
    return createCode(input, userId);
  }
}

export async function updateCodeDb(
  id: string,
  input: UpdateQRCodeInput,
  userId = "demo-user"
): Promise<QRCodeRecord | null> {
  if (!shouldUseSupabase()) return updateCode(id, input, userId);

  try {
    return await updateCodeInSupabase(id, input, userId);
  } catch {
    return updateCode(id, input, userId);
  }
}

export async function deleteCodeDb(id: string, userId = "demo-user"): Promise<boolean> {
  if (!shouldUseSupabase()) return deleteCode(id, userId);

  try {
    return await deleteCodeInSupabase(id, userId);
  } catch {
    return deleteCode(id, userId);
  }
}

export async function incrementScanDb(shortId: string): Promise<QRCodeRecord | null> {
  if (!shouldUseSupabase()) return incrementScan(shortId);

  try {
    return await incrementScanInSupabase(shortId);
  } catch {
    return incrementScan(shortId);
  }
}
