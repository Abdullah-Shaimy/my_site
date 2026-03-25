export default function NotFoundInDashboard() {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6">
      <h1 className="text-xl font-bold text-slate-900">QR code not found</h1>
      <p className="mt-2 text-sm text-slate-600">This QR code does not exist or has been deleted.</p>
    </div>
  );
}
