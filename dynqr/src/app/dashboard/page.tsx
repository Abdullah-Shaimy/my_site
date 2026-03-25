import Link from "next/link";
import QRCodeTable from "@/components/dashboard/QRCodeTable";
import StatsCard from "@/components/dashboard/StatsCard";
import { listCodesDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const codes = await listCodesDb();
  const totalScans = codes.reduce((sum, code) => sum + code.scans, 0);
  const activeCodes = codes.filter((code) => code.active).length;
  const recentlyScanned = codes.filter((code) => Boolean(code.lastScannedAt)).length;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Dashboard</h1>
          <p className="text-sm text-slate-600">Manage your dynamic QR codes from one place.</p>
        </div>
        <Link
          href="/dashboard/codes/new"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Create QR Code
        </Link>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total QR Codes" value={codes.length} />
        <StatsCard label="Active Codes" value={activeCodes} />
        <StatsCard label="Total Scans" value={totalScans} />
        <StatsCard label="Scanned Codes" value={recentlyScanned} />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">Your QR Codes</h2>
        <QRCodeTable codes={codes} />
      </section>
    </div>
  );
}
