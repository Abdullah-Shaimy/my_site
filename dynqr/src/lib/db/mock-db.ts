import { generateShortId } from "@/lib/utils/generate-short-id";
import type { CreateQRCodeInput, QRCodeRecord, UpdateQRCodeInput } from "@/lib/types";

type Store = {
  codes: QRCodeRecord[];
};

const globalStore = globalThis as typeof globalThis & { __dynqrStore?: Store };

function getStore(): Store {
  if (!globalStore.__dynqrStore) {
    globalStore.__dynqrStore = { codes: [] };
  }
  return globalStore.__dynqrStore;
}

export function listCodes(userId = "demo-user"): QRCodeRecord[] {
  return getStore().codes.filter((code) => code.userId === userId);
}

export function getCodeById(id: string, userId = "demo-user"): QRCodeRecord | null {
  return listCodes(userId).find((code) => code.id === id) ?? null;
}

export function getCodeByShortId(shortId: string): QRCodeRecord | null {
  return getStore().codes.find((code) => code.shortId === shortId) ?? null;
}

export function createCode(input: CreateQRCodeInput, userId = "demo-user"): QRCodeRecord {
  const now = new Date().toISOString();
  const code: QRCodeRecord = {
    id: crypto.randomUUID(),
    shortId: generateShortId(8),
    name: input.name,
    destinationUrl: input.destinationUrl,
    active: true,
    scans: 0,
    lastScannedAt: null,
    createdAt: now,
    updatedAt: now,
    userId,
  };

  getStore().codes.unshift(code);
  return code;
}

export function updateCode(id: string, input: UpdateQRCodeInput, userId = "demo-user"): QRCodeRecord | null {
  const store = getStore();
  const index = store.codes.findIndex((code) => code.id === id && code.userId === userId);
  if (index === -1) return null;

  const current = store.codes[index];
  const next: QRCodeRecord = {
    ...current,
    ...input,
    updatedAt: new Date().toISOString(),
  };

  store.codes[index] = next;
  return next;
}

export function deleteCode(id: string, userId = "demo-user"): boolean {
  const store = getStore();
  const before = store.codes.length;
  store.codes = store.codes.filter((code) => !(code.id === id && code.userId === userId));
  return store.codes.length !== before;
}

export function incrementScan(shortId: string): QRCodeRecord | null {
  const store = getStore();
  const index = store.codes.findIndex((code) => code.shortId === shortId);
  if (index === -1) return null;

  const current = store.codes[index];
  const next: QRCodeRecord = {
    ...current,
    scans: current.scans + 1,
    lastScannedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.codes[index] = next;
  return next;
}