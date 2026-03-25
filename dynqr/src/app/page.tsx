import Link from "next/link";

const features = [
  {
    title: "Dynamic QR Codes",
    description: "Create one QR and update destination URLs anytime without reprinting.",
  },
  {
    title: "Scan Analytics",
    description: "Track total scans and last scanned timestamp for every QR code.",
  },
  {
    title: "Easy Sharing",
    description: "Copy redirect links and download QR as PNG or SVG in one click.",
  },
  {
    title: "Free Dashboard",
    description: "Manage active or inactive status and edit your QR links from one place.",
  },
];

export default function HomePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-16">
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg shadow-blue-100 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Free Service</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">DynQR</h1>
        <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
          Dynamic QR Code Management System for creators and businesses. Build editable QR codes,
          track scans, and keep every campaign link up to date.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Open Dashboard
          </Link>
          <Link
            href="/signup"
            className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Create Account
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{feature.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
