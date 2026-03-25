import Link from "next/link";
import type { QRCodeRecord } from "@/lib/types";

interface QRCodeTableProps {
  codes: QRCodeRecord[];
}

export default function QRCodeTable({ codes }: QRCodeTableProps) {
  if (codes.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
        No QR codes yet. Create your first one from dashboard.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Short ID</th>
            <th className="px-4 py-3">Scans</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {codes.map((code) => (
            <tr key={code.id} className="border-b border-slate-100 last:border-b-0">
              <td className="px-4 py-3 font-medium text-slate-900">{code.name}</td>
              <td className="px-4 py-3 font-mono text-xs text-slate-600">{code.shortId}</td>
              <td className="px-4 py-3 text-slate-700">{code.scans}</td>
              <td className="px-4 py-3 text-slate-700">{code.active ? "Active" : "Inactive"}</td>
              <td className="px-4 py-3">
                <Link href={`/dashboard/codes/${code.id}`} className="text-primary hover:underline">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}