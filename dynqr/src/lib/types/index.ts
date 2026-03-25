export interface QRCodeRecord {
  id: string;
  shortId: string;
  name: string;
  destinationUrl: string;
  active: boolean;
  scans: number;
  lastScannedAt: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateQRCodeInput {
  name: string;
  destinationUrl: string;
}

export interface UpdateQRCodeInput {
  name?: string;
  destinationUrl?: string;
  active?: boolean;
}