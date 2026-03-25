import { listCodes } from "@/lib/db/mock-db";

export const dynamic = "force-dynamic";

export default function AnalyticsPage() {
  const codes = listCodes();
  const sorted = [...codes].sort((a, b) => b.scans - a.scans).slice(0, 8);
  const maxScans = sorted[0]?.scans ?? 1;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-600">Top scanned QR codes and latest activity.</p>
      </header>

      {sorted.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
          No scan analytics yet. Create and share a QR code to start tracking.
        </div>
      ) : (
        <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
          {sorted.map((code) => {
            const width = Math.max(8, Math.round((code.scans / maxScans) * 100));
            return (
              <div key={code.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <p className="font-medium text-slate-800">{code.name}</p>
                  <p className="text-slate-600">{code.scans} scans</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-blue-600" style={{ width: `${width}%` }} />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Last scanned: {code.lastScannedAt ? new Date(code.lastScannedAt).toLocaleString() : "Never"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
